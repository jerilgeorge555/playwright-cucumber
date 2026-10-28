
pipeline {
    agent any

    stages {
        stage('Checkout and Inspect') {
            steps {
                echo 'Starting the Playwright Cucumber pipeline'
                sh '''
                    export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
                    node -v
                    npm -v
                    echo "Selected environment: ${TEST_ENV:-dev}"
                '''
            }
            
        }
        stage('Install Dependencies') {
            steps {
                sh '''
                    export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
                    npm ci
                '''
            }
        }

        stage('Cucumber Smoke Tests') {
            steps {
                sh '''
                    export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
                    TEST_ENV=QA npm run test:cucumber:smoke
                '''
            }
        }

        
    }
    post {
        always {
            archiveArtifacts(
                artifacts: 'reports/**/*.html,reports/**/*.json',
                allowEmptyArchive: true
            )
        }
    }
}
