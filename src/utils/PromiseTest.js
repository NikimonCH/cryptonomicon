const syncStart = ") Запуск функции (запуск синхронного кода)";
const asyncStart = ") Запуск промиса (запуск асинхронного кода) c задержкой = ";
const asyncEndResolved = ") Промис resolved (асинхронный код завершён)";
const asyncEndRejected = ") Промис rejected (асинхронный код завершён)";
const syncEnd = ") Промис создан (синхронный код завершён)";

function testPromise(value) {
  console.log("(№ " + value + syncStart);

  let p1 = new Promise((resolve, reject) => {
    const delay = Math.random() * 3000;
    console.log("(№", value + asyncStart, delay);
    if (delay < 1500) {
      window.setTimeout(() => {
        resolve(value);
      }, delay);
    } else {
      window.setTimeout(() => {
        reject(value + " too long delay");
      }, 1500);
    }
  });

  p1.then(
    (onResolved) => {
      console.log("(№", onResolved + asyncEndResolved);
    },
    (onRejected) => {
      console.log("(№", onRejected + asyncEndRejected);
    }
  );

  console.log("(№", value + syncEnd);
}

function createPromise(value) {
  const p1 = new Promise((resolve, reject) => {
    const delay = Math.random() * 3000;
    if (delay < 1500) {
      window.setTimeout(() => {
        resolve(value);
      }, delay);
    } else {
      window.setTimeout(() => {
        reject(value + " too long delay");
      }, 1500);
    }
  });

  p1.then(
    (onResolved) => {
      return "(№", onResolved + asyncEndResolved;
    },
    (onRejected) => {
      return "(№", onRejected + asyncEndRejected;
    }
  );
}

for (let x = 0; x < 10; x++) testPromise(x);
for (let x = 0; x < 10; x++) createPromise(x);
