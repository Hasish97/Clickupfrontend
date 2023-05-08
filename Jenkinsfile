pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
        disableConcurrentBuilds()
    }

    stages {
        stage('Install packages') {
        
            steps {
                
                sh "npm install --legacy-peer-deps"
            }
        }

        stage('Build') {
            steps {
                sh 'export CI=false && npm run build'
                
            }
        }
        
        
        
            
        }

}
