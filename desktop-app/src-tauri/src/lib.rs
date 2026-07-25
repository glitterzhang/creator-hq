use tauri_plugin_fs::FsExt;

// Grants read/write access to a folder the user picked via the dialog plugin's folder picker.
// Filesystem scope is intentionally NOT pre-declared broadly in capabilities/default.json —
// it's extended here, at runtime, only for the exact path the user chose. Tauri does not persist
// this grant across app restarts, so the frontend must call this again on every launch for any
// previously-linked folder (see restoreFolderLink() in creator-tracker-app.html).
#[tauri::command]
fn extend_fs_scope(app: tauri::AppHandle, path: String) -> Result<(), String> {
  let scope = app.fs_scope();
  scope.allow_directory(&path, true).map_err(|e| e.to_string())?;
  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![extend_fs_scope])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
