-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Release" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_ArtistToRelease" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArtistToRelease_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArtistToRelease_B_fkey" FOREIGN KEY ("B") REFERENCES "Release" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GenreToRelease" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GenreToRelease_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GenreToRelease_B_fkey" FOREIGN KEY ("B") REFERENCES "Release" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE INDEX "Artist_name_idx" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "Genre_name_idx" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "Release_year_idx" ON "Release"("year");

-- CreateIndex
CREATE INDEX "Release_type_idx" ON "Release"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Release_title_year_key" ON "Release"("title", "year");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToRelease_AB_unique" ON "_ArtistToRelease"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToRelease_B_index" ON "_ArtistToRelease"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToRelease_AB_unique" ON "_GenreToRelease"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToRelease_B_index" ON "_GenreToRelease"("B");
