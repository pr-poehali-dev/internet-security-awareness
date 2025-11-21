import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const sections = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'scams', label: 'Мошенники', icon: 'ShieldAlert' },
    { id: 'passwords', label: 'Пароли', icon: 'Lock' },
    { id: 'tips', label: 'Советы', icon: 'Lightbulb' },
    { id: 'test', label: 'Тест', icon: 'ClipboardCheck' },
  ];

  const scamTypes = [
    {
      title: 'Фишинг',
      description: 'Поддельные сайты банков и сервисов',
      icon: 'Fish',
      tips: ['Проверяйте URL адрес', 'Смотрите на значок замка в браузере', 'Не переходите по ссылкам из SMS']
    },
    {
      title: 'Телефонное мошенничество',
      description: 'Звонки от "банков" и "служб безопасности"',
      icon: 'Phone',
      tips: ['Банки не просят CVV код', 'Перезвоните в банк сами', 'Не сообщайте коды из SMS']
    },
    {
      title: 'Социальная инженерия',
      description: 'Манипуляции через эмоции и страх',
      icon: 'Users',
      tips: ['Не паникуйте при угрозах', 'Проверяйте информацию', 'Не отправляйте деньги незнакомцам']
    },
    {
      title: 'Поддельные приложения',
      description: 'Вирусы под видом популярных программ',
      icon: 'Smartphone',
      tips: ['Скачивайте только из официальных магазинов', 'Читайте отзывы', 'Проверяйте разработчика']
    }
  ];

  const passwordTips = [
    { icon: 'Key', text: 'Минимум 12 символов длиной' },
    { icon: 'Hash', text: 'Используйте буквы, цифры и символы' },
    { icon: 'Ban', text: 'Не используйте личную информацию' },
    { icon: 'RefreshCw', text: 'Уникальный пароль для каждого сайта' },
    { icon: 'Vault', text: 'Используйте менеджер паролей' },
    { icon: 'ShieldCheck', text: 'Включайте двухфакторную аутентификацию' }
  ];

  const generalTips = [
    { icon: 'Download', tip: 'Регулярно обновляйте систему и программы' },
    { icon: 'Wifi', tip: 'Не используйте публичный Wi-Fi для банковских операций' },
    { icon: 'Mail', tip: 'Не открывайте подозрительные вложения в почте' },
    { icon: 'Share2', tip: 'Проверяйте настройки приватности в соцсетях' },
    { icon: 'HardDrive', tip: 'Делайте резервные копии важных данных' },
    { icon: 'Eye', tip: 'Закрывайте камеру на ноутбуке, когда не используете' }
  ];

  const quizQuestions = [
    {
      question: 'Вам позвонили из "банка" и попросили назвать код из SMS. Что делать?',
      options: [
        'Назвать код, если звонят из банка',
        'Положить трубку и позвонить в банк сам',
        'Проверить код и назвать половину цифр',
        'Попросить перезвонить позже'
      ],
      correct: 1
    },
    {
      question: 'Какой пароль более надежный?',
      options: [
        'password123',
        'Дата рождения',
        'G7#mK9$xP2!qL5',
        'имя + фамилия'
      ],
      correct: 2
    },
    {
      question: 'Вы получили письмо от "PayPal" со ссылкой для подтверждения данных. Что делать?',
      options: [
        'Сразу перейти по ссылке',
        'Проверить адрес отправителя и открыть PayPal через закладку',
        'Отправить свои данные в ответном письме',
        'Переслать друзьям для проверки'
      ],
      correct: 1
    },
    {
      question: 'Можно ли использовать один пароль для всех сайтов?',
      options: [
        'Да, если он сложный',
        'Да, но менять его раз в месяц',
        'Нет, нужен уникальный пароль для каждого сайта',
        'Да, если добавить цифру в конце'
      ],
      correct: 2
    },
    {
      question: 'Что такое двухфакторная аутентификация?',
      options: [
        'Два разных пароля',
        'Дополнительный код подтверждения кроме пароля',
        'Вход с двух устройств одновременно',
        'Проверка по отпечатку пальца'
      ],
      correct: 1
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { text: 'Отлично! Вы эксперт в кибербезопасности! 🏆', color: 'text-green-400' };
    if (percentage >= 80) return { text: 'Хорошо! У вас отличные знания! 🎯', color: 'text-blue-400' };
    if (percentage >= 60) return { text: 'Неплохо! Есть куда расти 📚', color: 'text-yellow-400' };
    return { text: 'Стоит повторить материал 📖', color: 'text-orange-400' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="ShieldCheck" className="text-purple-400" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                КиберЩит
              </span>
            </div>
            <div className="flex gap-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(section.id)}
                  className="gap-2"
                >
                  <Icon name={section.icon as any} size={18} />
                  <span className="hidden md:inline">{section.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {activeSection === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-6 py-12">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-scale-in">
                Безопасность в Интернете
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Защитите себя от мошенников и киберугроз. Изучите основы цифровой безопасности!
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => setActiveSection('scams')} className="gap-2">
                  <Icon name="Rocket" size={20} />
                  Начать обучение
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveSection('test')} className="gap-2">
                  <Icon name="ClipboardCheck" size={20} />
                  Пройти тест
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'ShieldAlert', title: 'Защита от мошенников', desc: 'Узнайте популярные схемы обмана' },
                { icon: 'Lock', title: 'Надежные пароли', desc: 'Создавайте безопасные пароли' },
                { icon: 'Award', title: 'Проверка знаний', desc: 'Пройдите тест и получите оценку' }
              ].map((item, i) => (
                <Card key={i} className="p-6 bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 cursor-pointer">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Icon name={item.icon as any} className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'scams' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Виды мошенничества</h2>
              <p className="text-slate-300 text-lg">Знание — лучшая защита от злоумышленников</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {scamTypes.map((scam, index) => (
                <Card key={index} className="p-6 bg-slate-800/50 border-purple-500/20 hover:border-red-500/40 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Icon name={scam.icon as any} className="text-white" size={28} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{scam.title}</h3>
                        <p className="text-slate-400">{scam.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <p className="text-sm font-semibold text-purple-400">Как защититься:</p>
                      {scam.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Icon name="CheckCircle" className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-slate-300 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'passwords' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Создание надежного пароля</h2>
              <p className="text-slate-300 text-lg">Ваш пароль — первая линия защиты</p>
            </div>

            <Card className="p-8 bg-slate-800/50 border-purple-500/20 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Icon name="Key" className="text-purple-400" size={32} />
                  <h3 className="text-2xl font-bold text-white">Правила безопасного пароля</h3>
                </div>
                <div className="grid gap-4">
                  {passwordTips.map((tip, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Icon name={tip.icon as any} className="text-white" size={20} />
                      </div>
                      <span className="text-slate-200">{tip.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-400">Пример плохого пароля:</span>
                    <Badge variant="destructive" className="gap-1">
                      <Icon name="X" size={14} />
                      Слабый
                    </Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <code className="text-red-400">ivan1990</code>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-semibold text-slate-400">Пример хорошего пароля:</span>
                    <Badge className="gap-1 bg-green-500">
                      <Icon name="CheckCircle" size={14} />
                      Надежный
                    </Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <code className="text-green-400">K9$mP#7xR@2nL&5qW</code>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Полезные советы</h2>
              <p className="text-slate-300 text-lg">Простые правила для безопасности каждый день</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalTips.map((item, index) => (
                <Card key={index} className="p-6 bg-slate-800/50 border-purple-500/20 hover:border-blue-500/40 transition-all hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Icon name={item.icon as any} className="text-white" size={28} />
                    </div>
                    <p className="text-slate-200 leading-relaxed">{item.tip}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'test' && (
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            {!testStarted && !showResults && (
              <Card className="p-8 bg-slate-800/50 border-purple-500/20">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                    <Icon name="ClipboardCheck" className="text-white" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Тест на знание безопасности</h2>
                  <p className="text-slate-300 text-lg">
                    Проверьте свои знания! {quizQuestions.length} вопросов ждут вас.
                  </p>
                  <Button size="lg" onClick={() => setTestStarted(true)} className="gap-2">
                    <Icon name="Play" size={20} />
                    Начать тест
                  </Button>
                </div>
              </Card>
            )}

            {testStarted && !showResults && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Вопрос {currentQuestion + 1} из {quizQuestions.length}</span>
                    <span>{Math.round(((currentQuestion) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <Progress value={((currentQuestion) / quizQuestions.length) * 100} className="h-2" />
                </div>

                <Card className="p-8 bg-slate-800/50 border-purple-500/20">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white leading-relaxed">
                      {quizQuestions[currentQuestion].question}
                    </h3>
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-4 px-6 text-base hover:border-purple-500 hover:bg-purple-500/10"
                          onClick={() => handleAnswer(index)}
                        >
                          <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {showResults && (
              <Card className="p-8 bg-slate-800/50 border-purple-500/20">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto">
                    <Icon name="Award" className="text-white" size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Тест завершен!</h2>
                  <div className="space-y-2">
                    <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {calculateScore()} / {quizQuestions.length}
                    </p>
                    <p className={`text-xl font-semibold ${getScoreMessage(calculateScore()).color}`}>
                      {getScoreMessage(calculateScore()).text}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    {quizQuestions.map((q, index) => (
                      <div key={index} className="p-4 rounded-lg bg-slate-700/30 text-left">
                        <div className="flex items-start gap-3">
                          <Icon
                            name={answers[index] === q.correct ? 'CheckCircle' : 'XCircle'}
                            className={answers[index] === q.correct ? 'text-green-400' : 'text-red-400'}
                            size={20}
                          />
                          <div className="space-y-1 flex-1">
                            <p className="text-slate-200 text-sm">{q.question}</p>
                            {answers[index] !== q.correct && (
                              <p className="text-green-400 text-xs">
                                Правильный ответ: {q.options[q.correct]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 justify-center pt-4">
                    <Button onClick={resetTest} className="gap-2">
                      <Icon name="RotateCcw" size={18} />
                      Пройти снова
                    </Button>
                    <Button variant="outline" onClick={() => setActiveSection('home')} className="gap-2">
                      <Icon name="Home" size={18} />
                      На главную
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-purple-500/20 bg-slate-900/80 backdrop-blur-lg mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheck" className="text-purple-400" size={24} />
              <span className="text-slate-400">КиберЩит © 2024</span>
            </div>
            <p className="text-slate-500 text-sm text-center">
              Будьте внимательны и защищены в интернете! 🛡️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
