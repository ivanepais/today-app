import React from 'react';

interface DashboardTemplateProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode; // El contenido principal
  footer?: React.ReactNode;
}

export const DashboardTemplate = ({ 
  header, 
  sidebar, 
  children, 
  footer 
}: DashboardTemplateProps) => {
  return (
    <div className="template-dashboard">
      {/* Región del Header */}
      <header className="template-header">
        {header}
      </header>

      <div className="template-body" style={{ display: 'flex' }}>
        {/* Región Lateral */}
        <aside className="template-sidebar">
          {sidebar}
        </aside>

        {/* Región de Contenido Principal */}
        <main className="template-main-content">
          {children}
        </main>
      </div>

      {/* Región del Footer Opcional */}
      {footer && (
        <footer className="template-footer">
          {footer}
        </footer>
      )}
    </div>
  );
};