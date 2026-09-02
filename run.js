const concurrently = require('concurrently');

console.log("==================================================");
console.log("🚀 Starting Fullstack E-Commerce Suite...");
console.log("   🔹 SERVER  : http://localhost:4000");
console.log("   🔹 CLIENT  : http://localhost:3000");
console.log("   🔹 ADMIN   : http://localhost:3001");
console.log("==================================================\n");

const { result } = concurrently(
    [
        {
            command: 'npm start',
            name: 'SERVER',
            cwd: './server',
            prefixColor: 'blue.bold'
        },
        {
            command: 'npm start',
            name: 'CLIENT',
            cwd: './client',
            prefixColor: 'green.bold'
        },
        {
            command: 'npm start',
            name: 'ADMIN',
            cwd: './admin',
            prefixColor: 'magenta.bold'
        }
    ],
    {
        prefix: '[{name}]',
        killOthers: ['failure', 'success'],
        restartTries: 0
    }
);

result.then(
    () => console.log('All processes finished.'),
    (err) => console.log('Process exited.')
);
