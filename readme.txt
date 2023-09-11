MIKU SEVÓN


Online location of application:

http://hakopirtti.ddns.net:100/


How to run the application locally:

1. Make a database to https://www.elephantsql.com/
2. Run following SQL Statements:

        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        password CHAR(60) NOT NULL
        );


        CREATE TABLE morning_reports(
        id SERIAL PRIMARY KEY,
        user_id INT,
        date DATE,
        sleep_duration FLOAT,
        sleep_quality INT,
        generic_mood INT
        );

        CREATE TABLE evening_reports(
        id SERIAL PRIMARY KEY,
        user_id INT,
        date DATE,
        exercise_time FLOAT,
        studying_time FLOAT,
        eating_reqularity INT,
        eating_quality INT,
        generic_mood INT
        );

3. If you are using VSCode, download Deno support for VSCode from extensions and paste the following object into your launch.json file (if you dont have launch.json file, make one in path ./vscode/launch.json)

 {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Deno",
            "program": "${workspaceFolder}/app.js",
            "cwd": "${workspaceFolder}",
            "runtimeExecutable": "deno",
            "runtimeArgs": [
                "run",
                "--inspect-brk=127.0.0.1:9229",
                "--allow-all",
                "--unstable"
            ],
            "env": {"DATABASE_URL":"your database_url"},
            "attachSimplePort": 9229,
            "outputCapture": "std"
            
        },

(There is already launch.json file in the project directory)

And use 'Launch node' to launch the application.

(Remember to add your database url as an environment variable)

Another way to run test is typing the following commands in your command prompt:
    'set DATABASE_URL=your database_url
    'deno run --allow-all --unstable app.js'


How to test the application:

1. Make a new database to https://www.elephantsql.com/ with the same SQL statements as shown above.
2. If you are using VSCode, download Deno support for VSCode from extensions and paste the following object into your launch.json file (if you dont have launch.json file, make one in path ./vscode/launch.json)

{
            "type": "pwa-node",
            "request": "launch",
            "name": "Run tests",
            "program": "${workspaceFolder}",
            "cwd": "${workspaceFolder}",
            "runtimeExecutable": "deno",
            "runtimeArgs": [
                "test",
                "--inspect-brk=127.0.0.1:9229",
                "--allow-all",
                "--unstable"
            ],
            "env": {"TEST_ENVIRONMENT":true},
            "env": {"DATABASE_URL":"your database_url"},
            "attachSimplePort": 9229,
            "outputCapture": "std"
          },

And use 'Run tests' to launch the application.

(Remember to add your test database url as an environment variable)

I noticed that if the tests are ran on command prompt, the session isn't set properly and tests that reuire authentication don't work.
All the tests work just fine if they are ran by VSCode, though.

To run the tests use these commands for command prompt:
    'set DATABASE_URL=your database_url
    'set TEST_ENVIRONMENT=true'
    'deno test --allow-all --unstable'

I recommend using Visual Studio code, as it's much simpler.
