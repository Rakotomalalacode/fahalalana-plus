// types/categorie.ts
export interface Categorie {
  id: number
  nom: string
  imageUrl?: string | null
  imageId?: string | null
  usercreat?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateCategorieRequest {
  nom: string
  usercreat?: string
  image?: File
}

export interface UpdateCategorieRequest {
  nom?: string
  usercreat?: string
  image?: File
}

export interface CategorieResponse {
  id: number
  nom: string
  imageUrl?: string | null
  imageId?: string | null
  usercreat?: string | null
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface FileUploadHook {
  files: FileWithPreview[]
  isDragging: boolean
  errors: string[]
}

export interface FileWithPreview {
  id: string
  file: File
  preview: string
}

export interface FileUploadActions {
  handleDragEnter: (e: React.DragEvent) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent) => void
  openFileDialog: () => void
  removeFile: (id: string) => void
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>
}