const { spawn } = require('child_process');
console.log("Python script running");
module.exports = {
    start: function(dCriminal, date, callback){
        const childPython = spawn('python', ['model.py', `${dCriminal}`, `${date}`]);
        let result;
        childPython.stdout.on('data', (data) => {
            // console.log(`stdout: ${data}`);
            result = `${data}`;
            // console.log(result);
            // return result;
        });

        childPython.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            // return data;
        });

        childPython.on('close', (code) => {
            // console.log(`child process exited with code ${code}`);
            return callback(result);
            // return code;
        });
        // console.log(result);
        // return result;
    }
}

// const childPython = spawn('python', ['model.py', '2', '382']);

// childPython.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// childPython.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// childPython.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });