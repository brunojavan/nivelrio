import { calculateStatusProgress, calculateScales } from './calculations.js';
import { riverStatusThresholds } from './thresholds.js';

export function setProgressOnDivs(riverId, progress) {
    const statuses = ['normal', 'attention', 'alert', 'emergency'];

    statuses.forEach(status => {
        let div = document.querySelector(`div.lvl-bar.${status}#${riverId}`);
        if (div) {
            // Se o status for 'emergency', use o valor de 'emergencyI'
            let progressValue = status === 'emergency' ? progress['emergencyI'] : progress[status];
            div.style.width = `${progressValue}%`;
        }
    });
}

export function determineRiverStatus(riverId, nivel) {
    let thresholds = riverStatusThresholds[riverId];
    let statusInfo = {
        status: "",
        cssClass: ""
    };

    if (nivel <= thresholds.normal.max) {
        statusInfo.status = "Normalidade";
        statusInfo.cssClass = "normal";
    } else if (nivel > thresholds.normal.max && nivel <= thresholds.attention.max) {
        statusInfo.status = "Atenção";
        statusInfo.cssClass = "attention";
    } else if (nivel > thresholds.attention.max && nivel <= thresholds.alert.max) {
        statusInfo.status = "Alerta";
        statusInfo.cssClass = "alert";
    } else {
        statusInfo.status = "Emergência";
        statusInfo.cssClass = "emergency";
    }

    return statusInfo;
}

export function setRiverScalesOnDivs() {
    const scales = calculateScales();

    for (let river in scales) {
        // Definindo o flex-basis para a div com classe "leve-mode normal" e ID do rio
        let normalDiv = document.querySelector(`div.level-mode.normal#${river}`);
        if (normalDiv) {
            normalDiv.style.flexBasis = `${scales[river].scale1}%`;
        }

        // Definindo o flex-basis para a div com classe "leve-mode attention" e ID do rio
        let attentionDiv = document.querySelector(`div.level-mode.attention#${river}`);
        if (attentionDiv) {
            attentionDiv.style.flexBasis = `${scales[river].scale2}%`;
        }

        // Definindo o flex-basis para a div com classe "leve-mode alert" e ID do rio
        let alertDiv = document.querySelector(`div.level-mode.alert#${river}`);
        if (alertDiv) {
            alertDiv.style.flexBasis = `${scales[river].scale3}%`;
        }
    }
}

// Chamar a função após calcular as escalas
setRiverScalesOnDivs();

export function updateRiverData(riverId, riverData) {
    let latestValue = parseFloat(riverData[0].Nivel.replace(',', '.'));
    let previousValue;

    // Encontrando o primeiro valor diferente
    for (let i = 1; i < riverData.length; i++) {
        if (parseFloat(riverData[i].Nivel.replace(',', '.')) !== latestValue) {
            previousValue = parseFloat(riverData[i].Nivel.replace(',', '.'));
            break;
        }
    }

    // Calculando a diferença
    let difference = latestValue - (previousValue || latestValue);

    // Atualizando o HTML conforme o resultado
    let pElement = document.querySelector(`p#${riverId}`);
    let iconDiv = document.querySelector(`div.variation-icon#${riverId}`);
    let variationSpan = document.querySelector(`span.variation#${riverId}`);

    if (difference > 0) {
        pElement.textContent = "o rio está subindo";
        iconDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"> <path d="M5.84987 1.57095C5.90956 1.51551 5.95777 1.47076 6 1.43273C6.04223 1.47076 6.09044 1.51551 6.15013 1.57095L10.8828 5.96732C11.1543 6.21945 11.576 6.20087 11.8248 5.92582C12.0736 5.65078 12.0552 5.22342 11.7838 4.9713L7.02994 0.555265C6.90622 0.440245 6.77082 0.314357 6.64179 0.222373C6.48973 0.11397 6.2769 0 6 0C5.7231 0 5.51027 0.11397 5.35821 0.222373C5.22917 0.314363 5.09377 0.440251 4.97005 0.555277L0.216188 4.9713C-0.0552247 5.22342 -0.0735607 5.65078 0.175234 5.92582C0.424028 6.20087 0.845739 6.21945 1.11715 5.96732L5.84987 1.57095Z" fill="#EF4444"/> <path d="M5.84989 7.42603C5.90957 7.37058 5.95777 7.32584 6 7.28781C6.04223 7.32584 6.09043 7.37058 6.15011 7.42603L10.8828 11.8224C11.1543 12.0745 11.576 12.056 11.8248 11.7809C12.0736 11.5059 12.0552 11.0785 11.7838 10.8264L7.03011 6.41051C6.90633 6.29542 6.77086 6.16947 6.64176 6.07744C6.48966 5.96903 6.27685 5.85512 6 5.85512C5.72315 5.85512 5.51034 5.96903 5.35824 6.07744C5.22913 6.16947 5.09368 6.29542 4.9699 6.4105L0.216188 10.8264C-0.0552249 11.0785 -0.0735605 11.5059 0.175234 11.7809C0.424029 12.056 0.84574 12.0745 1.11715 11.8224L5.84989 7.42603Z" fill="#EF4444"/> </svg>';
        iconDiv.classList.add("up");
    } else if (difference < 0) {
        pElement.textContent = "o rio está descendo";
        iconDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"> <path d="M5.84987 10.429C5.90956 10.4845 5.95777 10.5292 6 10.5673C6.04223 10.5292 6.09044 10.4845 6.15013 10.429L10.8828 6.03268C11.1543 5.78055 11.576 5.79913 11.8248 6.07418C12.0736 6.34922 12.0552 6.77658 11.7838 7.0287L7.02994 11.4447C6.90622 11.5598 6.77082 11.6856 6.64179 11.7776C6.48973 11.886 6.2769 12 6 12C5.7231 12 5.51027 11.886 5.35821 11.7776C5.22917 11.6856 5.09377 11.5597 4.97005 11.4447L0.216188 7.0287C-0.0552247 6.77658 -0.0735607 6.34922 0.175234 6.07418C0.424028 5.79913 0.845739 5.78055 1.11715 6.03268L5.84987 10.429Z" fill="#22C55E"/> <path d="M5.84989 4.57397C5.90957 4.62942 5.95777 4.67416 6 4.71219C6.04223 4.67416 6.09043 4.62942 6.15011 4.57397L10.8828 0.177579C11.1543 -0.0745449 11.576 -0.0559649 11.8248 0.21908C12.0736 0.494126 12.0552 0.921481 11.7838 1.17361L7.03011 5.58949C6.90633 5.70458 6.77086 5.83053 6.64176 5.92256C6.48966 6.03097 6.27685 6.14488 6 6.14488C5.72315 6.14488 5.51034 6.03097 5.35824 5.92256C5.22913 5.83053 5.09368 5.70458 4.9699 5.5895L0.216188 1.17361C-0.0552249 0.921481 -0.0735605 0.494126 0.175234 0.21908C0.424029 -0.0559649 0.84574 -0.0745449 1.11715 0.177579L5.84989 4.57397Z" fill="#22C55E"/> </svg>';
        iconDiv.classList.add("down");
    }

    // Adicionando a diferença no span
    variationSpan.textContent = difference.toFixed(2).replace('.', ',') + 'm';
}

export function processRiverData(riverId, data) {
    // Pegando o valor do índice 0 para o rio especificado
    let latestEntry = data[riverId][0];
    let latestValue = parseFloat(latestEntry.Nivel.replace(',', '.'));
    let latestRead = latestEntry.Leitura;

    // Formatando o valor
    let formattedValue = latestValue.toFixed(2).replace('.', ',') + 'm';

    // Exibindo o valor formatado no h3 com id do rio especificado
    let h3Element = document.querySelector(`h3#${riverId}`);
    if (h3Element) {
        h3Element.textContent = formattedValue;
    }

    // Formatando a data e hora da leitura
    let date = new Date(latestRead);
    let formattedDate = date.getDate().toString().padStart(2, '0') + '/' + 
                        (date.getMonth() + 1).toString().padStart(2, '0') + ' às ' + 
                        date.getHours().toString().padStart(2, '0') + ':' + 
                        date.getMinutes().toString().padStart(2, '0');

    // Inserindo a data e hora formatada no span com classe "read" e id do rio especificado
    let spanElement = document.querySelector(`span.read#${riverId}`);
    if (spanElement) {
        spanElement.textContent = formattedDate;
    }

    // Determinando o status e a classe CSS do rio
    let riverStatusInfo = determineRiverStatus(riverId, latestValue);

    // Adicionando a classe CSS aos elementos especificados
    let cardElement = document.querySelector(`div.card.status#${riverId}`);
    let labelElement = document.querySelector(`div.label#${riverId}`);
    let pStatusElement = document.querySelector(`p.${riverStatusInfo.cssClass}#${riverId}`);

    if (cardElement) {
        cardElement.classList.add(riverStatusInfo.cssClass);
    }

    if (labelElement) {
        labelElement.classList.add(riverStatusInfo.cssClass);
        labelElement.textContent = riverStatusInfo.status;
    }

    if (pStatusElement) {
        pStatusElement.classList.add("active");
    }

    // Comparando o nível atual com o primeiro nível diferente e atualizando o HTML
    updateRiverData(riverId, data[riverId]);

    // Calculando o progresso de cada status
    let progress = calculateStatusProgress(riverId, latestValue);

    // Atualizando as divs com o progresso
    setProgressOnDivs(riverId, progress);
}