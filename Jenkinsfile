pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
        disableConcurrentBuilds()
    }

    stages {
        stage('Install packages') {
        
            steps {
                sh 'printenv'
                sh 'node --version'
                sh "npm install --legacy-peer-deps"
            }
        }

        stage('Build') {
            steps {
                sh "npm run build"
            }
        }
        
        
        
            
        }

}
