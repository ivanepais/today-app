import { useState, useEffect } from 'react';
import { DashboardTemplate } from '../../templates/DashboardTemplate/DashboardTemplate';
import { FilterPanel } from '../../organisms/FilterPanel/FilterPanel';

// Simulamos tipos de datos de una API
interface Category {
  id: string;
  label: string;
  count: number;
}

export const DashboardPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Efecto para cargar datos reales (Simulado)
  useEffect(() => {
    const fetchData = async () => {
      // Simulamos un retraso de 100ms para que el test pueda ver el loading
      await new Promise(resolve => setTimeout(resolve, 100));

      // Imagina que esto viene de tu Backend
      const data = [
        { id: '1', label: 'Frontend', count: 45 },
        { id: '2', label: 'Backend', count: 32 },
        { id: '3', label: 'DevOps', count: 12 },
      ];
      setCategories(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // 2. Lógica de negocio (manejo de selección)
  const handleToggleCategory = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // 3. Definimos los componentes para los "slots" del Template
  const header = (
    <nav className="page-nav">
      <h1>Mi Dashboard Pro</h1>
    </nav>
  );

  const sidebar = (
    <FilterPanel
      categories={categories}
      selectedIds={selectedIds}
      onToggleCategory={handleToggleCategory}
      title="Categorías de Cursos"
    />
  );

  if (isLoading) return <div>Cargando sistema...</div>;

  return (
    <DashboardTemplate header={header} sidebar={sidebar}>
      <section className="main-content-view">
        <h2>Resultados ({selectedIds.length} filtros activos)</h2>
        <p>Aquí se mostraría la lista de cursos filtrada...</p>
        
        {/* Aquí irían otros organismos como un ProductGrid */}
      </section>
    </DashboardTemplate>
  );
};