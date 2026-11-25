import { useState, useRef } from 'react';
import styles from './SettingsView.module.css';
import { 
  Palette, 
  Grid3X3, 
  Sparkles, 
  SlidersHorizontal, 
  Ruler, 
  Layers, 
  Volume2, 
  Vibrate, 
  Download, 
  Upload, 
  Trash2, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const SettingsView = ({
  settings,
  updateSetting,
  favoritesCount,
  exportFavorites,
  importFavorites,
  clearAllCache,
  triggerHaptic
}) => {
  const fileInputRef = useRef(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const showNotification = (msg, isError = false) => {
    setFeedbackMessage({ text: msg, isError });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleThemeChange = (newTheme) => {
    triggerHaptic(10);
    updateSetting('theme', newTheme);
    showNotification(`Tema cambiado a ${newTheme === 'dark' ? 'Oscuro' : newTheme === 'light' ? 'Claro' : 'AMOLED'}`);
  };

  const handleMobileColumnsChange = (cols) => {
    triggerHaptic(10);
    updateSetting('mobileColumns', cols);
  };

  const handleUnitChange = (unit) => {
    triggerHaptic(10);
    updateSetting('unitSystem', unit);
  };

  const handleSortChange = (sort) => {
    triggerHaptic(10);
    updateSetting('sortOption', sort);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = importFavorites(content);
        if (result.success) {
          showNotification(`Se importaron ${result.count} Pokémon a favoritos con éxito.`);
        } else {
          showNotification(result.error || 'Error al importar archivo.', true);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleConfirmClearCache = () => {
    clearAllCache();
    setShowClearConfirm(false);
    showNotification('Caché y datos temporales restablecidos.');
  };

  return (
    <div className={styles.container}>
      {/* Cabecera de la vista */}
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Ajustes</h2>
        <p className={styles.pageSubtitle}>
          Personaliza la apariencia, comportamiento y almacenamiento de tu Pokédex Material You.
        </p>
      </div>

      {/* Notificación Toast / Banner */}
      {feedbackMessage && (
        <div className={`${styles.toast} ${feedbackMessage.isError ? styles.toastError : styles.toastSuccess}`}>
          <CheckCircle2 size={18} />
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* 1. SECCIÓN: APARIENCIA Y PANTALLA */}
      <section className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <Palette size={20} className={styles.sectionIcon} />
          <h3 className={styles.sectionHeading}>Apariencia y Pantalla</h3>
        </div>

        {/* Selector de Tema MD3 SegmentedButton */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingTitle}>Tema del Sistema</span>
            <span className={styles.settingDesc}>Paleta dinámica de superficies y contrastes MD3</span>
          </div>

          <div className={styles.segmentedGroup}>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.theme === 'dark' ? styles.segmentedActive : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              Oscuro
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.theme === 'light' ? styles.segmentedActive : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              Claro
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.theme === 'amoled' ? styles.segmentedActive : ''}`}
              onClick={() => handleThemeChange('amoled')}
            >
              AMOLED
            </button>
          </div>
        </div>

        {/* Densidad de Grilla en Móvil */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.titleWithIcon}>
              <Grid3X3 size={17} />
              <span className={styles.settingTitle}>Densidad de Grilla (Móvil)</span>
            </div>
            <span className={styles.settingDesc}>Número de columnas mostradas en pantallas compactas</span>
          </div>

          <div className={styles.segmentedGroup}>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.mobileColumns === 2 ? styles.segmentedActive : ''}`}
              onClick={() => handleMobileColumnsChange(2)}
            >
              2 Columnas
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.mobileColumns === 3 ? styles.segmentedActive : ''}`}
              onClick={() => handleMobileColumnsChange(3)}
            >
              3 Columnas
            </button>
          </div>
        </div>

        {/* Modo Variocolor Global Switch */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.titleWithIcon}>
              <Sparkles size={17} />
              <span className={styles.settingTitle}>Modo Variocolor (Shiny) Global</span>
            </div>
            <span className={styles.settingDesc}>Muestra sprites brillantes en toda la lista por defecto</span>
          </div>

          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={settings.globalShiny}
              onChange={(e) => {
                triggerHaptic(10);
                updateSetting('globalShiny', e.target.checked);
              }}
            />
            <span className={styles.switchSlider}></span>
          </label>
        </div>
      </section>

      {/* 2. SECCIÓN: POKÉDEX Y DATOS */}
      <section className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <SlidersHorizontal size={20} className={styles.sectionIcon} />
          <h3 className={styles.sectionHeading}>Pokédex y Datos</h3>
        </div>

        {/* Ordenamiento por defecto */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingTitle}>Ordenamiento Inicial</span>
            <span className={styles.settingDesc}>Criterio de orden predeterminado en la grilla</span>
          </div>

          <div className={styles.segmentedGroup}>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.sortOption === 'id-asc' ? styles.segmentedActive : ''}`}
              onClick={() => handleSortChange('id-asc')}
            >
              #ID
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.sortOption === 'name-asc' ? styles.segmentedActive : ''}`}
              onClick={() => handleSortChange('name-asc')}
            >
              A – Z
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.sortOption === 'stats-desc' ? styles.segmentedActive : ''}`}
              onClick={() => handleSortChange('stats-desc')}
            >
              Mayor Stats
            </button>
          </div>
        </div>

        {/* Sistema de Unidades */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.titleWithIcon}>
              <Ruler size={17} />
              <span className={styles.settingTitle}>Sistema de Unidades</span>
            </div>
            <span className={styles.settingDesc}>Unidades para medidas de altura y peso</span>
          </div>

          <div className={styles.segmentedGroup}>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.unitSystem === 'metric' ? styles.segmentedActive : ''}`}
              onClick={() => handleUnitChange('metric')}
            >
              Métrico (m / kg)
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${settings.unitSystem === 'imperial' ? styles.segmentedActive : ''}`}
              onClick={() => handleUnitChange('imperial')}
            >
              Imperial (ft / lbs)
            </button>
          </div>
        </div>

        {/* Formas Alternativas Switch */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.titleWithIcon}>
              <Layers size={17} />
              <span className={styles.settingTitle}>Mostrar Formas Alternativas</span>
            </div>
            <span className={styles.settingDesc}>Habilita pestañas de Mega, Gigamax y Regionales en detalles</span>
          </div>

          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={settings.showAlternateForms}
              onChange={(e) => {
                triggerHaptic(10);
                updateSetting('showAlternateForms', e.target.checked);
              }}
            />
            <span className={styles.switchSlider}></span>
          </label>
        </div>
      </section>

      {/* 3. SECCIÓN: EXPERIENCIA E INTERACCIÓN */}
      <section className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <Volume2 size={20} className={styles.sectionIcon} />
          <h3 className={styles.sectionHeading}>Experiencia e Interacción</h3>
        </div>

        {/* Sonido / Cry Automático Switch */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingTitle}>Reproducir Grito Oficial al Abrir</span>
            <span className={styles.settingDesc}>Reproduce el audio característico al inspeccionar un Pokémon</span>
          </div>

          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={settings.autoPlayCry}
              onChange={(e) => {
                triggerHaptic(10);
                updateSetting('autoPlayCry', e.target.checked);
              }}
            />
            <span className={styles.switchSlider}></span>
          </label>
        </div>

        {/* Vibración Háptica Switch */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <div className={styles.titleWithIcon}>
              <Vibrate size={17} />
              <span className={styles.settingTitle}>Vibración Háptica (Móvil)</span>
            </div>
            <span className={styles.settingDesc}>Feedback táctil al pulsar chips, pestañas y favoritos</span>
          </div>

          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={settings.hapticFeedback}
              onChange={(e) => {
                triggerHaptic(20);
                updateSetting('hapticFeedback', e.target.checked);
              }}
            />
            <span className={styles.switchSlider}></span>
          </label>
        </div>
      </section>

      {/* 4. SECCIÓN: ALMACENAMIENTO Y RESPALDO */}
      <section className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <Download size={20} className={styles.sectionIcon} />
          <h3 className={styles.sectionHeading}>Almacenamiento y Respaldo</h3>
        </div>

        {/* Exportar e Importar Favoritos */}
        <div className={styles.settingItemCol}>
          <div className={styles.settingInfo}>
            <span className={styles.settingTitle}>Copia de Seguridad de Favoritos</span>
            <span className={styles.settingDesc}>
              Tienes {favoritesCount} Pokémon marcados como favoritos en este navegador.
            </span>
          </div>

          <div className={styles.backupActions}>
            <button
              type="button"
              className={styles.actionOutlineBtn}
              onClick={() => {
                triggerHaptic(15);
                exportFavorites();
                showNotification('Archivo JSON de favoritos descargado.');
              }}
            >
              <Download size={16} />
              <span>Exportar (.json)</span>
            </button>

            <button
              type="button"
              className={styles.actionOutlineBtn}
              onClick={() => {
                triggerHaptic(15);
                fileInputRef.current?.click();
              }}
            >
              <Upload size={16} />
              <span>Importar (.json)</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleFileImport}
            />
          </div>
        </div>

        {/* Limpiar Caché */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingTitle}>Restablecer Caché de Sesión</span>
            <span className={styles.settingDesc}>Limpia respuestas temporales y recarga los datos desde PokéAPI</span>
          </div>

          <button
            type="button"
            className={styles.dangerActionBtn}
            onClick={() => setShowClearConfirm(true)}
          >
            <Trash2 size={16} />
            <span>Limpiar Datos</span>
          </button>
        </div>
      </section>

      {/* Diálogo de Confirmación MD3 */}
      {showClearConfirm && (
        <div className={styles.dialogScrim}>
          <div className={styles.dialogCard} role="alertdialog">
            <div className={styles.dialogIcon}>
              <AlertTriangle size={28} />
            </div>
            <h4 className={styles.dialogTitle}>¿Limpiar caché de sesión?</h4>
            <p className={styles.dialogMessage}>
              Esto forzará a la aplicación a solicitar de nuevo los datos a la PokéAPI. Tus Pokémon favoritos guardados no se borrarán.
            </p>
            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.dialogCancelBtn}
                onClick={() => setShowClearConfirm(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={styles.dialogConfirmBtn}
                onClick={handleConfirmClearCache}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
