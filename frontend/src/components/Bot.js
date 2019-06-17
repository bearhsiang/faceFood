import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

// all available props
const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#3f51b5',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3f51b5',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    };
  const steps = [
    {
      id: '0',
      message: 'Welcome! What is your name?',
      trigger: '1',
    },
    {
      id: '1',
      user: true,
      trigger: '2'
    },
    {
      id: '2',
      message: 'Hi {previousValue}! What can I help you?',
      trigger: '3'
    },
    {
      id: '3',
      options: [
        { value: 1, label:'Foods', trigger: '4' },
        { value: 2, label:'Drinks', trigger: '4' }
      ]
    },
    {
      id: '4',
      user: true,
      trigger: '5'
    },
    {
      id: '5',
      message: 'Awesome, {previousValue} does make your day!',
      trigger: '0'
    }
  ];
class Bot extends Component {
    BotReturn() {
        return (
            <ThemeProvider theme={theme}>
            <ChatBot 
            headerTitle= "Menu Bot"
            speechSynthesis={{ enable: true, lang: 'en' }}
            recognitionEnable={true}
            userAvatar={NavigationPreloadManager.jpg}
            steps={steps} />
            </ThemeProvider>
        );
    }

    render() {
    return (
        <div className="App">
            {this.BotReturn()}
        </div>
    );
    }
}

export default Bot;
