let timer;

onmessage = function (e) {
    const { command, duration } = e.data;

    if (command === "start") {
        const startTime = Date.now();
        const targetTime = startTime + duration * 1000;

        timer = setInterval(() => {
            const now = Date.now();
            const remaining = Math.round((targetTime - now) / 1000);
            postMessage(remaining);


            if (remaining < 1) {
                clearInterval(timer);
            }
        }, 1000);
    } else if (command === "stop") {
        clearInterval(timer);
    }
};
