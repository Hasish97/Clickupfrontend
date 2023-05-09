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
        
        stage('copy build to nginx') {
        
            steps {
                sh "sudo rm -rf /usr/share/nginx/html/build"
                sh "cp -r /var/lib/jenkins/workspace/Frontend/build /usr/share/nginx/html"
            }
        }
        stage('restart nginx') {
        
            steps {
                
                sh "sudo systemctl restart nginx"
           }
        }
        
            
    }

}
