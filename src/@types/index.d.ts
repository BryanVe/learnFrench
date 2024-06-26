type Lesson = {
  id: number
  name: string
  description: string
  userId?: number
  levelId: number
  sublevelId: number
  chapterId: number
  createdAt: string
  updatedAt: string
}

type Chapter = {
  id: number
  name: string
  userId?: number
  levelId: number
  sublevelId: number
  createdAt: string
  updatedAt: string
  lessons: Lesson[]
  completedLessonsIds: number[]
}

type SubLevel = {
	id: number
	name: string
	alias: string
	levelId: number
	createdAd: string
	updated: string
	chapters: number
  progressPercentage: number
}
