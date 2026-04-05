import { useState, useEffect } from 'react';
import { DashboardTemplate } from '../../templates/DashboardTemplate/DashboardTemplate';
import { FilterPanel } from '../../organisms/FilterPanel/FilterPanel';
import { Typography } from '../../atoms/Typography/Typography';
import { 
  PageContainer, 
  LoadingWrapper, 
  MainContentView 
} from './DashboardPage.styles';

interface Category {
  id: string;
  label: string;
  count: number;
}

export const DashboardPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulación de carga de API
      await new Promise(resolve => setTimeout(resolve, 800));

      const data = [
        { id: '1', label: 'Frontend', count: 45 },
        { id: '2', label: 'Backend', count: 32 },
        { id: '3', label: 'DevOps', count: 12 },
        { id: '4', label: 'UX/UI Design', count: 28 },
      ];
      setCategories(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleToggleCategory = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Preparamos los slots para la Template
  const headerContent = (
    <Typography variant="h2" color="primary">
      Tech Learning Dashboard
    </Typography>
  );

  const sidebarContent = (
    <FilterPanel
      categories={categories}
      selectedIds={selectedIds}
      onToggleCategory={handleToggleCategory}
      title="Categorías de Cursos"
    />
  );

  if (isLoading) {
    return (
      <LoadingWrapper>
        <span>Iniciando Sistema...</span>
      </LoadingWrapper>
    );
  }

  return (
    <PageContainer>
      <DashboardTemplate 
        header={headerContent} 
        sidebar={sidebarContent}
        footer={<Typography variant="body">© 2026 Liquid Glass Systems</Typography>}
      >
        <MainContentView>
          <header>
            <Typography variant="h1">Cursos Disponibles</Typography>
            <Typography variant="body" color="textSecondary">
              Explora nuestra selección basada en {selectedIds.length} filtros activos.
            </Typography>
          </header>

          {/* Aquí iría un Grid de tarjetas, por ejemplo */}
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="body">
              {selectedIds.length > 0 
                ? "Mostrando resultados personalizados..." 
                : "Selecciona una categoría para filtrar."}
            </Typography>
          </div>
        </MainContentView>
      </DashboardTemplate>
    </PageContainer>
  );
};