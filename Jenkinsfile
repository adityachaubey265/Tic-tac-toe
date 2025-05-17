pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/adityachaubey265/Tic-tac-toe.git', branch: 'master'
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'  // Add tests in your package.json for this to work
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying application...'
        // Add your deploy commands here, e.g. docker build/push or copy files to server
      }
    }
  }
}
