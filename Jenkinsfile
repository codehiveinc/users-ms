pipeline {
  agent any

  environment {
    DOCKERIMAGE = 'pipeline-users-ms'
    HOME = '.'
  }

  stages {
    stage('Build') {
      steps {
        script {
          docker.build(DOCKERIMAGE)
        }
      }
    }
  }
}
