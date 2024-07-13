pipeline {
    agent any

    stages {
        stage('Build and Run Docker') {
      steps {
        script {
          sh 'docker build -t mi-aplicacion .'

          sh 'docker run -d -p 3000:3000 --name mi-contenedor mi-aplicacion'
        }
      }
        }
    }

    post {
        always {
      sh 'docker stop mi-contenedor || true'
      sh 'docker rm mi-contenedor || true'
        }
    }
}
