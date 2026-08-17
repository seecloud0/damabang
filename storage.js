// Damabang (담아방) Local Storage Manager (100% On-Device Storage)
const STORAGE_KEY = 'damabang_local_data_v1';
const SETTINGS_KEY = 'damabang_settings_v1';

class StorageManager {
  constructor() {
    this.isIndexedDBAvailable = 'indexedDB' in window;
    this.dbName = 'DamabangDB';
    this.dbVersion = 1;
    this.storeName = 'pins';
    this.db = null;
  }

  async init() {
    if (!this.isIndexedDBAvailable) {
      console.warn('IndexedDB not supported, falling back to LocalStorage');
      return;
    }

    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('platform', 'platform', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
          store.createIndex('location', 'location.city', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB Error:', event.target.error);
        resolve(null); // gracefully degrade to localStorage
      };
    });
  }

  // Retrieve all saved pins
  async getAllPins() {
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = () => {
          let pins = request.result || [];
          // Sort by newest first
          pins.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          resolve(pins);
        };

        request.onerror = () => {
          resolve(this.getFromLocalStorage());
        };
      });
    } else {
      return this.getFromLocalStorage();
    }
  }

  // Save or update a single pin
  async savePin(pin) {
    if (!pin.id) {
      pin.id = 'pin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }
    if (!pin.createdAt) {
      pin.createdAt = new Date().toISOString();
    }
    pin.updatedAt = new Date().toISOString();

    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put(pin);

        request.onsuccess = () => {
          this.syncToLocalStorageBackup();
          resolve(pin);
        };
        request.onerror = (e) => reject(e);
      });
    } else {
      const pins = this.getFromLocalStorage();
      const index = pins.findIndex(p => p.id === pin.id);
      if (index >= 0) {
        pins[index] = pin;
      } else {
        pins.unshift(pin);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
      return pin;
    }
  }

  // Delete a pin by ID
  async deletePin(id) {
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(id);

        request.onsuccess = () => {
          this.syncToLocalStorageBackup();
          resolve(true);
        };
        request.onerror = (e) => reject(e);
      });
    } else {
      let pins = this.getFromLocalStorage();
      pins = pins.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
      return true;
    }
  }

  // Batch import pins (for backup restore or sample data)
  async importPins(pins, overwrite = false) {
    if (overwrite) {
      await this.clearAllPins();
    }
    for (const pin of pins) {
      await this.savePin(pin);
    }
    return true;
  }

  // Clear all stored data
  async clearAllPins() {
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.clear();
        transaction.oncomplete = () => {
          localStorage.removeItem(STORAGE_KEY);
          resolve(true);
        };
      });
    } else {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    }
  }

  // LocalStorage Fallback Helper
  getFromLocalStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('LocalStorage read error:', e);
      return [];
    }
  }

  async syncToLocalStorageBackup() {
    try {
      const pins = await this.getAllPins();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
    } catch (e) {
      console.warn('Backup sync skipped:', e);
    }
  }

  // Export all data as JSON Blob for local file download
  async exportToJSON() {
    const pins = await this.getAllPins();
    const exportData = {
      app: 'Damabang',
      appNameKr: '담아방',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      count: pins.length,
      pins: pins
    };
    return JSON.stringify(exportData, null, 2);
  }

  // Calculate storage usage statistics
  async getStorageStats() {
    const pins = await this.getAllPins();
    const jsonStr = JSON.stringify(pins);
    const sizeInBytes = new Blob([jsonStr]).size;
    
    // Group counts
    const categoryCount = {};
    const platformCount = { instagram: 0, youtube: 0, other: 0 };
    const cityCount = {};

    pins.forEach(pin => {
      // Category
      categoryCount[pin.category] = (categoryCount[pin.category] || 0) + 1;
      
      // Platform
      const p = pin.platform || 'other';
      platformCount[p] = (platformCount[p] || 0) + 1;

      // Location
      if (pin.location && pin.location.city) {
        cityCount[pin.location.city] = (cityCount[pin.location.city] || 0) + 1;
      }
    });

    return {
      totalPins: pins.length,
      sizeKB: (sizeInBytes / 1024).toFixed(1),
      categoryCount,
      platformCount,
      cityCount,
      lastUpdated: pins.length > 0 ? pins[0].createdAt : null
    };
  }
}

window.storageManager = new StorageManager();
