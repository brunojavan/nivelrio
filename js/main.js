import { riverStatusThresholds } from './thresholds.js';
import { calculateStatusProgress} from './calculations.js';
import { processRiverData, setProgressOnDivs} from './uiUpdates.js';

fetch('https://scrivers.s3.sa-east-1.amazonaws.com/data.json')
            .then(response => response.json())
            .then(data => {
                const rivers = ['river-01', 'river-02', 'river-03', 'river-04', 'river-05', 'river-06', 'river-07', 'river-08', 'river-09', 'river-10', 'river-11','river-12', 'river-13', 'river-14', 'river-15'];

                rivers.forEach(riverId => {
                    processRiverData(riverId, data);

                    const riverCurrentLevel = parseFloat(data[riverId][0].Nivel.replace(',', '.'));
                    const riverProgress = calculateStatusProgress(riverId, riverCurrentLevel);

                    // Atualizando as divs com o progresso do rio
                    setProgressOnDivs(riverId, riverProgress);
                });

                Object.keys(data).forEach(riverId => {
                    let riverData = data[riverId];
                    //console.log("Processing river:", riverId, riverData);
                    //let progressValues = calculateProgressForReadings(riverId, riverData.slice(0, 12));
                    //console.log("Progress values for", riverId, progressValues);

                    riverData.slice(0, 12).forEach((dataPoint, index) => {
                        let indexId = index < 10 ? '0' + index : index.toString();

                        if (dataPoint && dataPoint.Nivel) { // Verificação de nulidade adicionada aqui
                            let currentLevel = parseFloat(dataPoint.Nivel.replace(',', '.'));
                            let emergencyILevel = riverStatusThresholds[riverId].emergencyI;
                            let progressPercent = (currentLevel / emergencyILevel) * 100;

                            let progressSpan = document.querySelector(`.chart#${riverId} > .chart-bars > #index-${indexId} .chart-bar > .progress`);
                            if (progressSpan) {
                                progressSpan.style.height = `${Math.min(progressPercent, 100)}%`; // Limita a 100%
                            }
                        }
                    });


                    // Loop para inserir os dados de nível e hora nos elementos
                    for (var i = 0; i <= 11; i++) {
                        var indexId = i < 10 ? '0' + i : i.toString();
                        var level = riverData[i] ? riverData[i].Nivel + 'm' : '0m';
                        var readTime = riverData[i] ? new Date(riverData[i].Leitura) : new Date();
                        var formattedTime = readTime.getHours().toString().padStart(2, '0') + ':' + readTime.getMinutes().toString().padStart(2, '0');

                        var levelElement = document.querySelector(`#index-${indexId} .chart-text #level`);
                        var hourElement = document.querySelector(`#index-${indexId} .chart-text #hour`);

                        if (levelElement && hourElement) {
                            levelElement.textContent = level;
                            hourElement.textContent = formattedTime;
                        }
                        //console.log(`Dados para river ${riverId}, index ${indexId}: level = ${level}, time = ${formattedTime}`);
                    }

                });

                document.querySelectorAll('.cards .info').forEach(infoDiv => {
                    infoDiv.addEventListener('click', () => {
                        let cardDiv = infoDiv.closest('.cards'); // Encontra a div-pai .card
                        let chartDiv = cardDiv.querySelector('.chart'); // Encontra a div .chart dentro do mesmo .card
                        chartDiv.classList.toggle('hidden');
                    });
                });

            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });