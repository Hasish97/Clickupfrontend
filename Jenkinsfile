pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
        disableConcurrentBuilds()
    }

    stages {

        stage('Clean') {
            steps {
                sh 'rm -rf build'
                sh 'rm -rf node_modules'
            }
        }

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
        
        stage('Serve build') {
        
            steps {
                sh "sudo rm -rf /usr/share/nginx/html/build"
                sh "sudo cp -r /var/lib/jenkins/workspace/Frontend/build /usr/share/nginx/html"
            }
        }
        stage('Restart nginx') {
        
            steps {
                
                sh "sudo systemctl restart nginx"
           }
        }
        
            
    }

}
