export const utilService = {
   makeId,
   saveToStorage,
   loadFromStorage,
   debounce,
   animateCSS,
   getRandomIntInclusive,
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
   console.log('saving1')
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
