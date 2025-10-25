import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const handleDownload = () => {
    window.open('https://mcpehub.org/engine/dlfile.php?id=48823', '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50">
      <nav className="fixed top-0 w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-blue-100 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">VG</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              VisualGrand
            </h1>
          </div>
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Главная
            </button>
            <button onClick={() => scrollToSection('download')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Скачать
            </button>
            <button onClick={() => scrollToSection('guide')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Инструкция
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              FAQ
            </button>
            <button onClick={() => scrollToSection('updates')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Обновления
            </button>
            <button onClick={() => scrollToSection('support')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Поддержка
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">v2.5.0 — Новая версия</Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            VisualGrand Client
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Мощный чит-клиент для Minecraft с расширенными возможностями и простой установкой
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-transform hover:scale-105"
            onClick={() => scrollToSection('download')}
          >
            <Icon name="Download" className="mr-2" />
            Скачать клиент
          </Button>
        </div>
      </section>

      <section id="download" className="py-20 px-4 bg-white bg-opacity-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Скачать клиент</h2>
          <Card className="shadow-xl border-2 border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Smartphone" className="text-blue-600" />
                VisualGrand Client для Android
              </CardTitle>
              <CardDescription className="text-base">Последняя версия v2.5.0 — 25 октября 2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <Icon name="Info" className="text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Требования</p>
                  <p className="text-sm text-gray-600">Android 8.0+, Minecraft PE 1.20+</p>
                </div>
              </div>
              
              <Button 
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-6 text-lg rounded-xl"
                size="lg"
              >
                <Icon name="Download" className="mr-2" size={24} />
                Скачать файл (откроется страница загрузки)
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="guide" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Инструкция по установке</h2>
          <div className="space-y-6">
            <Card className="border-2 border-blue-100 transition-all hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <CardTitle className="text-xl">Скачайте файл клиента</CardTitle>
                    <CardDescription className="mt-2">Нажмите на кнопку Загрузить файл выше</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 border-blue-100 transition-all hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">Откройте файловый менеджер</CardTitle>
                    <CardDescription className="mt-2">
                      Нажмите на жёлтую кнопку Открыть папку с файлом после загрузки
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 border-blue-100 transition-all hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">Перейдите в нужную папку</CardTitle>
                    <CardDescription className="mt-2">
                      Откройте последовательно:
                    </CardDescription>
                    <div className="mt-3 p-4 bg-gray-900 rounded-lg">
                      <code className="text-cyan-400 text-sm">Android → data → com.mojang.minecraftpe → files → games → com.mojang → mods</code>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 border-blue-100 transition-all hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    4
                  </div>
                  <div>
                    <CardTitle className="text-xl">Скопируйте файл клиента</CardTitle>
                    <CardDescription className="mt-2">
                      Переместите загруженный файл visualgrand-client.apk в папку mods
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-cyan-50">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle" className="text-green-600 flex-shrink-0" size={32} />
                  <div>
                    <CardTitle className="text-xl text-green-800">Готово!</CardTitle>
                    <CardDescription className="mt-2 text-green-700">
                      Запустите Minecraft и наслаждайтесь возможностями VisualGrand Client
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-white bg-opacity-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 border-blue-100 rounded-xl px-6 bg-white">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Безопасен ли VisualGrand Client?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Да, наш клиент полностью безопасен. Мы не собираем личные данные и не содержим вредоносного кода. 
                Все файлы проверены антивирусами.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 border-blue-100 rounded-xl px-6 bg-white">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Какие возможности есть в клиенте?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                VisualGrand включает расширенный ESP, Fly, Speed, Killaura, NoFall, X-Ray и множество других модулей 
                для комфортной игры. Полный список функций доступен в документации.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 border-blue-100 rounded-xl px-6 bg-white">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Можно ли использовать на серверах?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Использование чит-клиентов на большинстве серверов запрещено правилами. Мы рекомендуем использовать 
                клиент только в одиночной игре или на серверах, где это разрешено.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 border-blue-100 rounded-xl px-6 bg-white">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Как обновить клиент до новой версии?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Просто скачайте новую версию и замените старый файл в папке mods. Все настройки сохранятся автоматически.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 border-blue-100 rounded-xl px-6 bg-white">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Что делать, если клиент не работает?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Убедитесь, что у вас установлена последняя версия Minecraft PE и Android не ниже 8.0. 
                Если проблема сохраняется, обратитесь в техподдержку в разделе ниже.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="updates" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">История обновлений</h2>
          <div className="space-y-6">
            <Card className="border-2 border-blue-100 transition-all hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-2xl">Версия 2.5.0</CardTitle>
                  <Badge className="bg-green-500 text-white">Актуальная</Badge>
                </div>
                <CardDescription>25 октября 2025</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Plus" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Добавлен новый модуль AntiKnockback для стабильности в PvP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Plus" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Улучшена производительность ESP на 40%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Wrench" className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Исправлены ошибки с Fly режимом на серверах</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Wrench" className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Оптимизирован интерфейс для новых устройств</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Версия 2.4.2</CardTitle>
                <CardDescription>10 октября 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Plus" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Добавлена поддержка Minecraft PE 1.20.5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Wrench" className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Исправлены критические баги с X-Ray</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Версия 2.4.0</CardTitle>
                <CardDescription>28 сентября 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Plus" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Редизайн меню настроек</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Plus" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Новый модуль AutoSprint</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Wrench" className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Множество исправлений стабильности</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="support" className="py-20 px-4 bg-white bg-opacity-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Техническая поддержка</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-100 transition-all hover:scale-105 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" className="text-white" size={32} />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">support@visualgrand.ru</p>
                <p className="text-sm text-gray-500">Ответим в течение 24 часов</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 transition-all hover:scale-105 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageCircle" className="text-white" size={32} />
                </div>
                <CardTitle>Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">@visualgrand_support</p>
                <p className="text-sm text-gray-500">Быстрые ответы в чате</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 transition-all hover:scale-105 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="text-white" size={32} />
                </div>
                <CardTitle>Сообщество</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Discord сервер</p>
                <p className="text-sm text-gray-500">Общайтесь с другими пользователями</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">VG</span>
            </div>
            <span className="text-2xl font-bold">VisualGrand</span>
          </div>
          <p className="text-blue-100 mb-4">
            Мощный чит-клиент для Minecraft PE
          </p>
          <p className="text-sm text-blue-200">
            © 2025 VisualGrand. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}