pipeline {
    agent any

    stages {
        stage('Build and Run Docker') {
      steps {
        script {
          sh 'docker build --network host --no-cache --pull -t mi-aplicacion . --timeout 3600'

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
