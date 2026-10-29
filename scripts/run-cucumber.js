
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const now = new Date();

const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
].join('-');

const time = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0')
].join('-');

const reportDir = `reports/${date}/run-${time}`;

mkdirSync(reportDir, { recursive: true });

const latestReport = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=./${date}/run-${time}/cucumber-report.html">
    <title>Latest Cucumber Report</title>
</head>
<body>
    <p>Opening the latest Cucumber report...</p>
</body>
</html>`;

writeFileSync('reports/latest-report.html', latestReport);

console.log(`Reports will be saved to: ${reportDir}`);
console.log(`Test environment: ${process.env.TEST_ENV || 'dev'}`);

const cucumberArgs = [
    'cucumber-js',
    '--import', 'support/hooks.js',
    '--import', 'step-definitions/**/*.js',
    'features',
    '--format', `json:${reportDir}/cucumber-report.json`,
    '--format', `html:${reportDir}/cucumber-report.html`,
    ...process.argv.slice(2)
];


const result = spawnSync('npx', cucumberArgs, {
    stdio: 'inherit'
});

const reportPath = `${reportDir}/cucumber-report.html`;

if (existsSync(reportPath)) {
    const html = readFileSync(reportPath, 'utf8');

    const environmentBanner = `
        <div style="padding: 12px; background: #e8f0fe;
                    color: #174ea6; font-family: Arial, sans-serif;
                    font-weight: bold;">
            Test Environment: ${process.env.TEST_ENV || 'dev'}
        </div>
    `;

    const updatedHtml = html.replace('<body>', `<body>${environmentBanner}`);

    writeFileSync(reportPath, updatedHtml);
} else {
    console.warn(`Cucumber HTML report was not generated: ${reportPath}`);
}

process.exit(result.status ?? 1);

