/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    fr: {
        translation: {
            WELCOME_MESSAGE: 'Bienvenue dans la calculatrice vocale',
            Cal: `le total est: %s`,
            DESPEDIDA: 'Reviens vite',
            AYUDA: 'ESSAYER AVEC: ALEXA ajouter 3 plus 2',
            DESCONOCER: 'désolé je ne connais pas cette commande'
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Bienvenido a la calculadora de voz',
            Cal: `El total es: %s`,
            DESPEDIDA: 'Vuelva pronto',
            AYUDA: 'intente con: ALEXA suma 3 mas 2',
            DESCONOCER: 'lo siento desconozco ese comando'
        }
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        //const speakOutput = 'Bienvenido a la calculadora de voz';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SumarHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SumarIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const valorn = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorn.value);
    const valorm = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorm.value);
    const resultado = valorn + valorm;
    let speechText;
    
    if (!speechText) {
        
      if (!valorn || isNaN(valorn) || valorn <= 0) {
        speechText = 'El primer numero tiene que ser mayor a 0.';
      }else if (!valorm || isNaN(valorm) || valorm <= 0) {
        speechText = 'El segundo numero tiene que ser mayor a 0.';
    }
      else {
         speechText = requestAttributes.t('Cal', resultado);
         //speechText = `La suma de ${valorn} mas ${valorm} es igual a ${resultado}.`;
      }
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const RestarHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RestarIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const valorn = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorn.value);
    const valorm = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorm.value);
    const resultado = valorn - valorm;
    let speechText;
    
    if (!speechText) {
        
      if (!valorn || isNaN(valorn) || valorn <= 0) {
        speechText = 'El primer numero tiene que ser mayor a 0.';
      }else if (!valorm || isNaN(valorm) || valorm <= 0) {
        speechText = 'El segundo numero tiene que ser mayor a 0.';
    }
      else {
         speechText = requestAttributes.t('Cal', resultado);
         //speechText = `La resta de ${valorn} menos ${valorm} es igual a ${resultado}.`;
      }
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const MultiplicarHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MultiplicarIntent';
  },
  handle(handlerInput) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const valorn = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorn.value);
    const valorm = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorm.value);
    const resultado = valorn * valorm;

    let speechText;
    
    if (!speechText) {
        
      if (!valorn || isNaN(valorn) || valorn <= 0) {
        speechText = 'El primer numero tiene que ser mayor a 0.';
      }else if (!valorm || isNaN(valorm) || valorm <= 0) {
        speechText = 'El segundo numero tiene que ser mayor a 0.';
    }
      else {
         speechText = requestAttributes.t('Cal', resultado);
         //speechText = `La multiplicación de ${valorn} por ${valorm} es igual a ${resultado}.`;
      }
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const DividirHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DividirIntent';
  },
  handle(handlerInput) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const valorn = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorn.value);
    const valorm = parseInt(handlerInput.requestEnvelope.request.intent.slots.valorm.value);
    const resultado = valorn / valorm;
    let speechText;
    
    if (!speechText) {
        
      if (!valorn || isNaN(valorn) || valorn <= 0) {
        speechText = 'El primer numero tiene que ser mayor a 0.';
      }else if (!valorm || isNaN(valorm) || valorm <= 0) {
        speechText = 'El segundo numero tiene que ser mayor a 0.';
    }
      else {
         speechText = requestAttributes.t('Cal', resultado);
         //speechText = `La división de ${valorn} entre ${valorm} es igual ${resultado}.`;
      }
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('AYUDA');
        //const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('DESPEDIDA');
        //const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('DESCONOCER');
        //const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//this request interceptors
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

//this request interceptors
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'es',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SumarHandler,
        RestarHandler,
        MultiplicarHandler,
        DividirHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .addRequestInterceptors(LocalizationInterceptor,LoggingRequestInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .lambda();