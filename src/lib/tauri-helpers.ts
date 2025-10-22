/**
 * Helpers para integración con Tauri
 * Estos helpers proveen fallbacks para cuando la app se ejecuta en el navegador
 */

/**
 * Verifica si Tauri está disponible
 */
export const isTauriAvailable = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI__' in window;
};

/**
 * Abre el diálogo de selección de carpeta
 * En el navegador, esto debe manejarse con input file
 */
export const selectFolder = async (): Promise<string | null> => {
  if (!isTauriAvailable()) {
    console.warn('Tauri no está disponible. Usa el input de archivos del navegador.');
    return null;
  }

  try {
    // @ts-ignore - Tauri API solo disponible cuando se compila con Tauri
    const { open } = await import('@tauri-apps/plugin-dialog');
    const selected = await open({
      directory: true,
      multiple: false,
    });

    if (selected) {
      return typeof selected === 'string' ? selected : selected.path;
    }
    return null;
  } catch (error) {
    console.error('Error al abrir diálogo de carpeta:', error);
    return null;
  }
};

/**
 * Invoca un comando de Tauri
 * En el navegador, devuelve un error
 */
export const invokeCommand = async <T>(
  command: string,
  args?: Record<string, unknown>
): Promise<T> => {
  if (!isTauriAvailable()) {
    throw new Error('Tauri no está disponible. Esta funcionalidad solo está disponible en la aplicación de escritorio.');
  }

  try {
    // @ts-ignore - Tauri API solo disponible cuando se compila con Tauri
    const { invoke } = await import('@tauri-apps/api/core');
    return await invoke(command, args);
  } catch (error) {
    console.error(`Error al invocar comando ${command}:`, error);
    throw error;
  }
};

/**
 * Descarga música usando spotdl a través de Tauri
 */
export const downloadMusicWithTauri = async (
  url: string,
  path: string
): Promise<{ success: boolean; message: string }> => {
  if (!isTauriAvailable()) {
    // Simular descarga en el navegador
    console.log('Simulando descarga en navegador:', { url, path });
    return {
      success: true,
      message: 'Descarga simulada (navegador)',
    };
  }

  try {
    const result = await invokeCommand<{ success: boolean; message: string }>(
      'download_music',
      { url, path }
    );
    return result;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Error desconocido al descargar'
    );
  }
};

/**
 * Verifica si spotdl está instalado
 */
export const checkSpotdlInstalled = async (): Promise<boolean> => {
  if (!isTauriAvailable()) {
    console.log('Tauri no disponible, no se puede verificar spotdl');
    return false;
  }

  try {
    const result = await invokeCommand<boolean>('check_spotdl');
    return result;
  } catch (error) {
    console.error('Error al verificar spotdl:', error);
    return false;
  }
};

/**
 * Obtiene información del sistema
 */
export const getSystemInfo = async (): Promise<string> => {
  if (!isTauriAvailable()) {
    return 'Navegador Web';
  }

  try {
    const result = await invokeCommand<string>('get_system_info');
    return result;
  } catch (error) {
    console.error('Error al obtener info del sistema:', error);
    return 'Desconocido';
  }
};
