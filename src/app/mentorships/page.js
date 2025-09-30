import React from 'react'
import Image from 'next/image'

const mentors = [
  {
    id: 1,
    name: 'Dr. Ayesha Khan',
    title: 'Cardiologist, SKIMS Srinagar',
    bio: 'Raised in Baramulla, Dr. Khan pursued medicine and now mentors students aspiring for NEET and medical careers.',
    avatar: 'https://i.pravatar.cc/600?img=47',
    email: 'ayesha.khan@example.com'
  },
  {
    id: 2,
    name: 'Prof. Rahul Sharma',
    title: 'Professor of Computer Science, JU',
    bio: 'From Jammu, Prof. Sharma is passionate about guiding students in software engineering and research careers.',
    avatar: 'https://i.pravatar.cc/600?img=12',
    email: 'rahul.sharma@example.com'
  },
  {
    id: 3,
    name: 'IAS Meera Qadri',
    title: 'Indian Administrative Service',
    bio: 'Hailing from Anantnag, Meera mentors UPSC aspirants with a focus on strategy, consistency, and well-being.',
    avatar: 'https://i.pravatar.cc/600?img=5',
    email: 'meera.qadri@example.com'
  },
  {
    id: 4,
    name: 'Er. Adil Mir',
    title: 'Structural Engineer, Srinagar',
    bio: 'An NIT Srinagar alumnus, Adil helps students with GATE prep, core engineering careers, and portfolios.',
    avatar: 'https://i.pravatar.cc/600?img=33',
    email: 'adil.mir@example.com'
  },
  {
    id: 5,
    name: 'Dr. Kiran Gupta',
    title: 'Psychologist, Jammu',
    bio: 'Guides students on stress management, exam preparation mindset, and holistic growth.',
    avatar: 'https://i.pravatar.cc/600?img=52',
    email: 'kiran.gupta@example.com'
  },
  {
    id: 6,
    name: 'Ar. Sana Wani',
    title: 'Architect, Srinagar',
    bio: 'Mentors design portfolios, NATA/JEE B.Arch prep, and studio readiness.',
    avatar: 'https://i.pravatar.cc/600?img=15',
    email: 'sana.wani@example.com'
  },
  {
    id: 7,
    name: 'Lt. Col. Vivek Singh',
    title: 'Indian Army (Retd.)',
    bio: 'Advises on SSB preparation, discipline building, and defense careers.',
    avatar: 'https://i.pravatar.cc/600?img=67',
    email: 'vivek.singh@example.com'
  },
  {
    id: 8,
    name: 'C.A. Nida Bashir',
    title: 'Chartered Accountant, Jammu',
    bio: 'Helps with CA Foundation/Inter strategy and finance careers.',
    avatar: 'https://i.pravatar.cc/600?img=25',
    email: 'nida.bashir@example.com'
  }
]

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="relative w-full h-56">
        <Image
          src={mentor.avatar}
          alt={mentor.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
        <p className="text-[#F39C12] font-semibold mt-0.5 text-sm">{mentor.title}</p>
        <p className="text-gray-600 mt-3 leading-relaxed text-sm h-20">{mentor.bio}</p>
        <div className="mt-5 flex flex-col relative items-center justify-between gap-3">
          <a href={`mailto:${mentor.email}`} className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2">
            {mentor.email}
          </a>
          <button className='text-sm bg-[#F39C12] text-white rounded-xl p-2 font-semibold hover:cursor-pointer'>Schedule a Meeting</button>
        </div>
      </div>
    </div>
  )
}

const page = () => {
  return (
    <section className="px-6 py-10 md:py-14 bg-gray-200">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">Mentorships</h1>
          <p className="text-[#F39C12] mt-3 max-w-2xl mx-auto">
            Meet mentors from Jammu & Kashmir who excelled in their fields and now give back to the community.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {mentors.map((m) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default page
