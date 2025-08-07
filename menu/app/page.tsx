import ResponsiveMenu from '@/components/Menu';

export default function Home() {
  const menuItems = [
    { label: 'Главная', href: '/' },
    { label: 'О нас', href: '/about' },
    { label: 'Услуги', href: '/services' },
    { label: 'Контакты', href: '/contact' },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Логотип</h1>
          <ResponsiveMenu items={menuItems} />
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Добро пожаловать!</h2>
        <p>Это демонстрация адаптивного меню.</p>
      </main>
    </div>
  );
}
