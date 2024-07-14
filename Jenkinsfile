pipeline {
    agent any

    stages {
      stage('Clean old containers') {
        steps {
          script {
            sh 'docker stop users-ms-container || true'
            sh 'docker rm users-ms-container || true'
          }
        }
      }
        stage('Build and Run Docker') {
      steps {
        script {
          sh 'docker build -t users-ms .'

          sh 'docker run -d -p 3000:3000 --name users-ms-container users-ms'
        }
      }
        }
    }
}
