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
    </div>
  );
}
