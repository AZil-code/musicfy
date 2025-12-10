export const utilService = {
   makeId,
   saveToStorage,
   loadFromStorage,
   debounce,
   animateCSS,
   getRandomIntInclusive,
   getIndexArray,
};

function makeId(length = 5) {
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
}

function saveToStorage(key, value) {
   console.log('saving1');
   localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
   const storedValue = localStorage[key];
   if (storedValue === undefined || storedValue === null) return _clone(defaultValue);

   try {
      return JSON.parse(storedValue);
   } catch (err) {
      console.warn(`Failed to parse storage key "${key}", falling back to default.`, err);
      return _clone(defaultValue);
   }
}

function _clone(value) {
   if (value === null || value === undefined) return value;
   if (typeof value === 'object') return JSON.parse(JSON.stringify(value));
   return value;
}

export function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getIndexArray(array) {
   const orderedIndexes = array.map((x, index) => index);
   const unusedIndexes = [...orderedIndexes];
   const randomizedIndexes = array.map((x, index, array) => {
      const idx = unusedIndexes[getRandomIntInclusive(0, unusedIndexes.length - 1)];
      const pos = unusedIndexes.findIndex((index) => index === idx);
      if (pos !== -1) unusedIndexes.splice(pos, 1);
      return idx;
   });

   return {
      orderedIndexes: orderedIndexes,
      randomizedIndexes: randomizedIndexes,
   };
}

export function animateCSS(el, animation, options = {}) {
   const { isRemoveClass = true } = options;

   const prefix = 'animate__';
   return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      el.classList.add(`${prefix}animated`, animationName);

      function handleAnimationEnd(event) {
         event.stopPropagation();
         if (isRemoveClass) el.classList.remove(`${prefix}animated`, animationName);
         resolve('Animation ended');
      }

      el.addEventListener('animationend', handleAnimationEnd, { once: true });
   });
}

export function debounce(func, delay) {
   let timeoutId;

   return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
         func(...args);
      }, delay);
   };
}

export function getExistingProperties(obj) {
   const truthyObj = {};
   for (const key in obj) {
      const val = obj[key];
      if (val || typeof val === 'boolean') {
         truthyObj[key] = val;
      }
   }
   return truthyObj;
}

export function handleMutliSelectChange({ options }) {
   const opts = [];
   Array.from(options).forEach((opt) => {
      if (opt.selected) opts.push(opt.value);
   });
   return opts;
}

export function formatTime(ms) {
   const numeric = Number(ms);
   if (!Number.isFinite(numeric) || numeric < 0) return '0:00';
   // Accept both milliseconds (legacy) and seconds (new Spotify data)
   const durationSec = numeric > 1000 ? Math.floor(numeric / 1000) : Math.floor(numeric);
   const minutes = Math.floor(durationSec / 60);
   const seconds = Math.floor(durationSec % 60);
   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
