import { Github, Linkedin, Twitter } from "lucide-react"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Former education technology researcher with a passion for making learning accessible to everyone.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Samantha Lee",
    role: "Chief Learning Officer",
    bio: "Educational psychologist specializing in personalized learning and cognitive development.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Marcus Chen",
    role: "AI Research Lead",
    bio: "PhD in Machine Learning with expertise in natural language processing and adaptive learning systems.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "UX/UI Designer",
    bio: "Award-winning designer focused on creating intuitive and accessible educational interfaces.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

export function Team() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The passionate experts behind Aptora who are dedicated to transforming education through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
              <img
                src={member.image || "/placeholder.svg"}
                alt={`Photo of ${member.name}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{member.bio}</p>

                <div className="flex space-x-4">
                  <a
                    href={member.social.github}
                    className="social-icon text-gray-500 hover:text-primary"
                    aria-label={`${member.name}'s GitHub profile`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="social-icon text-gray-500 hover:text-blue-600"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="social-icon text-gray-500 hover:text-blue-400"
                    aria-label={`${member.name}'s Twitter profile`}
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

