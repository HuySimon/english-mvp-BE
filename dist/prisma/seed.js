"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function run() {
    await prisma.booking.deleteMany();
    await prisma.slot.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.user.deleteMany();
    const teachers = [
        { name: 'Anna Nguyen', country: 'VN', accent: 'Vietnamese', pricePerHour: 9, rating: 4.8, headline: 'Luyện thi IELTS 7.5+', bio: '8 năm dạy Speaking/Pronunciation', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', tags: 'IELTS,Pronunciation' },
        { name: 'James Carter', country: 'US', accent: 'American', pricePerHour: 18, rating: 4.9, headline: 'Business English Coach', bio: 'Ex-Product Manager', avatarUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e', tags: 'Business,Interview' },
        { name: 'Emily Clark', country: 'UK', accent: 'British', pricePerHour: 16, rating: 4.7, headline: 'Conversational Fluency', bio: 'CELTA certified', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', tags: 'Conversation,CELTA' },
        { name: 'Minh Pham', country: 'VN', accent: 'Vietnamese', pricePerHour: 10, rating: 4.6, headline: 'Phát âm & Giao tiếp', bio: 'Tốt nghiệp sư phạm tiếng Anh', avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce', tags: 'Conversation,Pronunciation' },
        { name: 'Sarah Lee', country: 'AU', accent: 'Australian', pricePerHour: 17, rating: 4.85, headline: 'IELTS Speaking Coach', bio: 'CELTA, 6 năm kinh nghiệm', avatarUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c', tags: 'IELTS,Conversation' },
    ];
    for (const t of teachers) {
        const teacher = await prisma.teacher.create({ data: t });
        const now = Date.now();
        const slots = Array.from({ length: 12 }, (_, i) => ({ isoTime: new Date(now + (i + 1) * 3600000).toISOString(), teacherId: teacher.id }));
        await prisma.slot.createMany({ data: slots });
    }
}
run().then(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map