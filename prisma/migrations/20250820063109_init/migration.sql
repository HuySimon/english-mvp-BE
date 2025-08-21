-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "accent" TEXT NOT NULL,
    "pricePerHour" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "headline" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "tags" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isoTime" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "booked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Slot_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "slotTime" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_teacherId_slotTime_idx" ON "Booking"("teacherId", "slotTime");
