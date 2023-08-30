
export function getFileNameFromPath(path?: string) {
  if (path === undefined) return undefined
  const separatorIdx = path.lastIndexOf('/')
  if (separatorIdx === -1) {
    return undefined
  }

  return path.substring(separatorIdx + 1)
}

export function saveAsFile(fileName: string, blob: Blob) {
  console.log('saveAsFile', blob)
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}