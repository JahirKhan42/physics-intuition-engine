import { PhysicsEngineResponse, TargetAudience, DifficultyLevel, LanguageOption } from '../types/physics';

export const SAMPLE_PRESETS: Record<string, PhysicsEngineResponse> = {
  "Lenz's Law": {
    concept_name: "Lenz's Law",
    target_audience: "Class 12",
    difficulty_level: "Intermediate",
    language: "English",
    scientific_status: {
      category: "Established Empirical Law / Finding",
      scope_note: "A fundamental consequence of the Law of Conservation of Energy applied to electromagnetic induction, governed macroscopically by Faraday-Maxwell electrodynamics."
    },
    core_intuition: "Nature is magnetically stubborn: whenever magnetic flux through a conductor changes, the induced current creates its own magnetic field to oppose that exact change.",
    explanation: "When the magnetic flux linking a circuit changes, an electromotive force (EMF) is induced. Lenz's Law dictates the sign: the induced current produces an opposing magnetic field. If the magnet approaches with its North pole, the conductor face becomes a North pole to repel it. If the magnet is pulled away, the face becomes a South pole to attract it. Work must be done against these magnetic forces, and that mechanical work is precisely converted into electrical energy.",
    mathematics: {
      has_formula: true,
      latex_formula: "\\mathcal{E} = -N \\frac{d\\Phi_B}{dt}",
      variables: [
        {
          symbol: "\\mathcal{E}",
          meaning: "Induced Electromotive Force (EMF)",
          si_unit: "Volt (V)"
        },
        {
          symbol: "N",
          meaning: "Number of turns in the wire coil",
          si_unit: "Dimensionless"
        },
        {
          symbol: "\\Phi_B",
          meaning: "Magnetic flux (\\vec{B} \\cdot \\vec{A})",
          si_unit: "Weber (Wb) or T·m²"
        },
        {
          symbol: "t",
          meaning: "Time elapsed",
          si_unit: "Second (s)"
        },
        {
          symbol: "-",
          meaning: "The negative sign (The mathematical embodiment of Lenz's Law)",
          si_unit: "Signifier of opposition"
        }
      ],
      validity_conditions: "Applies to closed conductive loops in non-relativistic regimes. Relies on the conservation of energy; violates no thermodynamic laws."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: "The Stubborn Doorbell & Introverted Cat",
        story: "Imagine a territorial cat lounging behind a swinging door. If you try to push the door inward to enter, the cat leans its full body weight against the door to push back. But if you give up and pull the door back to leave, the cat hooks its claws into the carpet and pulls the door toward itself to prevent the doorway from emptying.",
        mapping: "The cat represents the induced eddy currents: it doesn't care whether the door is open or closed, it only opposes whichever direction you are currently moving the door.",
        where_it_breaks_down: "A cat gets tired, has psychological intent, and consumes chemical calories. Lenz's Law is not active resistance; it is a passive, instantaneous reaction arising directly from Lorentz forces on moving charge carriers."
      },
      {
        theme: "Mechanical / Tactile",
        title: "The Viscous Hydraulic Damper (Shock Absorber)",
        story: "Think of the hydraulic piston on a high-end storm door. If you try to slam it shut violently, the trapped fluid resists with immense back-pressure. If you try to yank it open rapidly, suction resists your pull. It exerts no force when the door is stationary.",
        mapping: "The resistance force is proportional to the rate of displacement (velocity), directly mirroring how induced EMF is proportional to the time-derivative of flux (dΦ/dt).",
        where_it_breaks_down: "Mechanical damping dissipates kinetic energy irreversibly into thermal friction without generating usable electrical potential or coherent secondary fields."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Regenerative Braking in Formula E / Electric Cars",
        story: "When a Formula E driver lifts off the throttle entering a hairpin turn, the car does not just coast. The electric motor reverses roles into a generator. The spinning copper rotors push electrons against the opposing magnetic fields, aggressively slowing the vehicle while charging the battery pack.",
        mapping: "The kinetic energy of the speeding vehicle is transformed into battery charge through the negative back-torque prescribed by Lenz's Law.",
        where_it_breaks_down: "EV regenerative braking systems use computerized pulse-width modulation and inverters to regulate torque, whereas Lenz's law is a continuous, direct physical coupling."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: true,
      title: "Common Student Misconception vs. Scientific Reality",
      explanation_or_context: "Students frequently confuse the induced field with the external field, believing Lenz's Law means 'the induced magnetic field always points opposite to the external magnetic field'.",
      scientific_reality: "The induced field opposes the CHANGE in magnetic flux (ΔΦ), not the direction of the magnetic field itself. If an external North field is weakening, the induced field points in the SAME direction as the external field to replenish the dying flux."
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: "Creator drops a shiny neodymium magnet down a clear glass tube (falls in 0.3s). Then drops the same magnet down a thick copper pipe: it floats down in slow motion taking 5 seconds.",
        on_screen_text: "Why is this magnet falling in slow motion?! 🧲",
        voiceover_narration: "Copper isn't magnetic. Yet watch this magnet fall down a solid copper tube—it literally floats like it's trapped in honey!"
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: "Split screen: 3D graphic showing swirling circular eddy currents in the copper wall. Red arrows pushing upward against the falling magnet.",
        on_screen_text: "Lenz's Law: E = -dΦ/dt",
        voiceover_narration: "As the magnet plunges, its changing magnetic field drives circular electrical currents inside the copper called eddy currents. And Lenz's Law states that nature hates change: the copper builds its own upward magnetic field that fights the falling magnet tooth and nail. If it didn't push back, energy would be created from nothing—violating the laws of physics!"
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: "Magnet gently pops out into the creator's palm. Quick cut to roller coaster magnetic brake fins.",
        on_screen_text: "Conservation of Energy in Action ⚡",
        voiceover_narration: "Your mechanical energy gets transformed directly into heat and electrical currents. That is Lenz's Law—and it's the exact friction-free tech stopping the world's fastest roller coasters!"
      }
    },
    demonstrations: {
      diy_household: {
        title: "The Floating Neodymium Tube Drop",
        materials: [
          "Strong cylindrical neodymium magnet (N42 or N52)",
          "Thick copper or aluminum pipe (at least 30-50 cm long)",
          "Plastic or glass pipe of identical length for control comparison",
          "Stopwatch or smartphone timer"
        ],
        steps: [
          "Hold the plastic pipe vertically and drop the neodymium magnet through. Observe it drops with standard free-fall acceleration (g ≈ 9.8 m/s²).",
          "Now hold the copper pipe vertically and drop the magnet inside.",
          "Observe the dramatic terminal velocity as the magnet takes several seconds to descend silently.",
          "Feel the copper pipe: with repeated drops, slight warming can be detected from dissipated Joule heating."
        ],
        safety_notice: "Keep strong neodymium magnets away from mechanical watches, pacemakers, credit cards, and smartphones. Avoid pinching fingers between strong magnets."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Center-zero sensitive galvanometer",
          "Solenoid coil with 500+ turns",
          "Strong AlNiCo or Neodymium bar magnet",
          "Connecting patch cords"
        ],
        setup_summary: "Connect the coil directly to the galvanometer with no battery. Rapidly thrust the North pole into the coil: observe an instantaneous needle deflection to the right. Hold the magnet stationary inside: needle returns to zero. Swiftly pull the magnet out: needle swings to the left with equal magnitude.",
        safety_notice: "Do not strike bar magnets on bench surfaces as mechanical shock degrades magnetic domain alignment."
      },
      digital_simulation: {
        concept_visualized: "Dynamic induced magnetic flux vectors & eddy current rings in cylindrical coordinate mesh",
        suggested_tool_or_animation_flow: "PhET Faraday's Electromagnetic Lab or Manim Python animation showing 3D Lenz opposing field lines appearing dynamically as flux gradient dΦ/dt spikes."
      }
    }
  },

  "Bernoulli's Principle": {
    concept_name: "Bernoulli's Principle",
    target_audience: "Class 11",
    difficulty_level: "Intermediate",
    language: "English",
    generation_source: "preloaded_preset",
    scientific_status: {
      category: "Simplified / Phenomenological Model",
      scope_note: "Derived from the work-energy theorem along a streamline for an ideal (incompressible, non-viscous, irrotational) fluid in steady flow without external work or heat transfer."
    },
    core_intuition: "Along an isolated fluid streamline where total energy is fixed, fluid accelerates forward because an upstream pressure pushes it toward lower pressure—meaning an increase in speed coincides with a drop in internal static pressure.",
    explanation: "Bernoulli's equation expresses the conservation of mechanical energy strictly along a continuous streamline for steady, incompressible (Mach < 0.3), and non-viscous flow. It is not a blanket rule that 'moving air always has lower pressure everywhere' (for example, air discharged from a fan or jet engine has energy added to it). In an isolated streamtube or Venturi constriction, fluid parcels accelerate forward because the net pressure behind them exceeds the pressure ahead (-dp = ρ v dv). This gain in kinetic energy per unit volume (½ρv²) is paid for by a corresponding drop in internal static pressure (P) and/or gravitational potential energy.",
    mathematics: {
      has_formula: true,
      latex_formula: "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant} \\quad (\\text{along a steady streamline})",
      variables: [
        {
          symbol: "P",
          meaning: "Internal static fluid pressure",
          si_unit: "Pascal (Pa) or N/m²"
        },
        {
          symbol: "\\rho",
          meaning: "Fluid density (assumed constant for incompressible flow)",
          si_unit: "kg/m³"
        },
        {
          symbol: "v",
          meaning: "Flow velocity along the streamline",
          si_unit: "m/s"
        },
        {
          symbol: "g",
          meaning: "Acceleration due to gravity",
          si_unit: "m/s²"
        },
        {
          symbol: "h",
          meaning: "Elevation along streamline above reference datum",
          si_unit: "Meter (m)"
        }
      ],
      validity_conditions: "Strictly valid only along an ideal streamline: incompressible flow (Mach < 0.3), zero viscous dissipation (no boundary layer separation), steady laminar state, and no shaft work or heat exchange."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: "The Frictionless Coaster Dip (Potential vs. Kinetic Energy Trade)",
        story: "Picture a roller coaster car rolling smoothly along a frictionless dip in the track. As the car plunges downward into the dip, its stored gravitational potential energy is directly converted into kinetic speed. The car does not get free energy from nowhere; its higher speed is strictly paid for by losing stored potential height.",
        mapping: "Static pressure in a fluid acts like stored internal potential energy per unit volume; when a constriction forces the fluid to accelerate forward, that internal static pressure drops to supply the forward kinetic energy along the streamline.",
        where_it_breaks_down: "A roller coaster car is a single discrete rigid solid mass moving in one dimension under gravity, whereas fluid flow is a continuous continuum with multidirectional intermolecular pressure forces and shear stress."
      },
      {
        theme: "Mechanical / Tactile",
        title: "The Venturi Constriction & Suction Tube",
        story: "In a smooth pipe with a tapered narrowing (Venturi throat), water entering the constriction must speed up to maintain continuous volumetric throughput. A perpendicular manometer tube placed right at the narrowest throat shows a lower fluid column height than in the wider sections.",
        mapping: "The constriction increases velocity (mass continuity), and the forward acceleration requires a favorable pressure drop, causing static pressure to drop lowest at the narrowest section.",
        where_it_breaks_down: "Real pipes experience viscous boundary friction and wall shear, converting a portion of the total mechanical energy irreversibly into heat."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Formula 1 Underbody Venturi Tunnels",
        story: "Modern racecars sculpt narrow underfloor Venturi channels. Air routed beneath the low-slung chassis accelerates through the constriction toward the diffuser, lowering the static pressure under the floor relative to atmospheric air above the car to produce downforce.",
        mapping: "Acceleration through a geometric channel reduces static pressure beneath the body, using the energy trade to generate aerodynamic downforce.",
        where_it_breaks_down: "Racecar aerodynamics involves turbulent boundary layer growth, ground clearance variations, and vortex breakdown that deviate from ideal streamline theory."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: true,
      title: "The 'Equal Transit Time' & 'Fast Air Always Has Low Pressure' Fallacies",
      explanation_or_context: "Two common misconceptions persist: (1) The equal-transit-time myth asserting air must traverse the top and bottom of a wing simultaneously, and (2) The generalized belief that air in motion 'always and everywhere' has lower static pressure than still air.",
      scientific_reality: "Air does not meet up simultaneously at the trailing edge; wing lift is fundamentally driven by downward momentum deflection and circulation. Furthermore, Bernoulli's relationship holds strictly along individual streamlines with constant total mechanical energy—it cannot be applied across boundary layers, behind fan blades, or in separated turbulent wakes."
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: "Creator holds two crisp sheets of paper 2 inches apart. Creator takes a breath to blow through the narrow gap between them.",
        on_screen_text: "Will they blow apart or draw together?! 🤔",
        voiceover_narration: "What happens if I blow air through the gap between these two sheets? Common sense says they should blow apart. Watch."
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: "Creator blows between sheets: they draw together. Overlay shows streamlines accelerating through the gap and static pressure arrows dropping.",
        on_screen_text: "Streamline Energy Tradeoff: P + ½ρv² = Constant",
        voiceover_narration: "They draw together! Why? Because along an accelerated streamline, total mechanical energy is conserved. To speed the air up through the narrow gap, the internal static pressure between the sheets must drop below the surrounding still room air. The higher atmospheric pressure outside pushes them inward!"
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: "Close up of an atomizer perfume sprayer or Venturi carburetor diagram.",
        on_screen_text: "Bernoulli's Boundary: Steady, Ideal Streamlines ✈️",
        voiceover_narration: "This velocity-pressure tradeoff is Bernoulli's principle—valid specifically along steady streamlines in ideal fluids, explaining carburetors, paint sprayers, and airspeed sensors!"
      }
    },
    demonstrations: {
      diy_household: {
        title: "The Ping Pong Ball Levitator",
        materials: [
          "Electric hair dryer with cool-air setting",
          "Ping pong ball or lightweight foam sphere",
          "Two standard A4 sheets of paper"
        ],
        steps: [
          "Turn hairdryer on high cool flow pointed vertically up.",
          "Gently place ping pong ball in the jet stream. It remains trapped mid-air.",
          "Slowly tilt the hair dryer up to 40 degrees: the ball stays stably suspended!",
          "When the ball tries to wobble out, faster air on the jet side pulls it back via low static pressure."
        ],
        safety_notice: "Always use the cool air setting on hairdryers to prevent heating or melting plastic balls."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Clear acrylic Venturi tube with multiple vertical manometer tubes",
          "Steady water reservoir or air blower",
          "Colored water dye for visibility",
          "Ruler scale"
        ],
        setup_summary: "Pass laminar water flow through the Venturi tube. Observe the liquid column heights in the vertical manometers: the liquid level is lowest at the narrow throat where flow velocity is highest, confirming minimal static pressure.",
        safety_notice: "Ensure all hose clamps are leak-tight to prevent water spillage on electrical recording gear."
      },
      digital_simulation: {
        concept_visualized: "Streamline contraction and static pressure gradient contour map",
        suggested_tool_or_animation_flow: "PhET Fluid Pressure and Flow interactive simulator with adjustable pipe diameter and pressure sensors."
      }
    }
  },

  "Quantum Tunneling": {
    concept_name: "Quantum Tunneling",
    target_audience: "College",
    difficulty_level: "Advanced",
    language: "English",
    scientific_status: {
      category: "Established Empirical Law / Finding",
      scope_note: "Direct analytical prediction of non-relativistic and relativistic wave mechanics (Schrödinger / Dirac equation), confirmed in alpha decay, STM, and semiconductor junctions."
    },
    core_intuition: "In the subatomic world, particles are quantum wavefunctions; even when a barrier is taller than a particle's energy, its probability wave leaks through rather than stopping cold.",
    explanation: "Classically, a particle with total energy E < V₀ cannot enter a potential barrier V₀ due to negative kinetic energy. Quantum mechanically, the wave function ψ(x) inside a finite rectangular barrier does not instantly terminate; instead, it satisfies d²ψ/dx² = κ²ψ with κ = √(2m(V₀ - E))/ℏ, decaying exponentially as an evanescent wave. For sufficiently thin barriers, ψ(x) retains a non-zero amplitude at the far boundary, yielding a finite transmission coefficient T ≈ 16(E/V₀)(1 - E/V₀)e^(-2κL).",
    mathematics: {
      has_formula: true,
      latex_formula: "T \\approx e^{-2 L \\sqrt{\\frac{2m(V_0 - E)}{\\hbar^2}}}",
      variables: [
        {
          symbol: "T",
          meaning: "Tunneling transmission probability",
          si_unit: "Dimensionless (0 to 1)"
        },
        {
          symbol: "L",
          meaning: "Barrier thickness / width",
          si_unit: "Meter (m)"
        },
        {
          symbol: "m",
          meaning: "Mass of the tunneling particle",
          si_unit: "Kilogram (kg)"
        },
        {
          symbol: "V_0",
          meaning: "Potential barrier height",
          si_unit: "Joule (J) or Electron-volt (eV)"
        },
        {
          symbol: "E",
          meaning: "Total kinetic and potential energy of particle (E < V_0)",
          si_unit: "Joule (J) or Electron-volt (eV)"
        },
        {
          symbol: "\\hbar",
          meaning: "Reduced Planck's constant (h / 2π)",
          si_unit: "Joule-second (J·s)"
        }
      ],
      validity_conditions: "WKB approximation valid for smooth barriers or rectangular barrier limits when barrier thickness L is comparable to the de Broglie wavelength."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: "Sound Waves Passing Through Double-Glazed Glass",
        story: "Stand outside a closed soundproof conference booth. Sound waves cannot travel as bulk air movement through solid glass, yet you still hear a muffled whisper on the other side.",
        mapping: "The acoustic wave decays exponentially inside the solid medium, but because the pane is thin, part of the wave amplitude leaks into the room as transmitted sound.",
        where_it_breaks_down: "Sound is a mechanical pressure wave of collective molecules, whereas quantum tunneling describes the probability amplitude of a single, indivisible quantum particle."
      },
      {
        theme: "Mechanical / Tactile",
        title: "Frustrated Total Internal Reflection (Optical Tunneling)",
        story: "Light traveling through a glass prism undergoes 100% total internal reflection at the diagonal face. But bring a second prism microscopically close (within nanometers), and light suddenly leaks across the air gap into the second prism.",
        mapping: "The evanescent electromagnetic wave in the gap mirrors the decaying wavefunction ψ(x). When the gap is thinner than the wavelength, light emerges on the other side.",
        where_it_breaks_down: "Photons are bosons with zero rest mass governed by Maxwell's wave equations, whereas massive fermions (electrons, protons) obey Schrödinger and Pauli exclusion constraints."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Video Game Character Wall Glitching",
        story: "In video games, a character collision box might clip slightly into a thin wall during a high-speed physics calculation frame. If the calculation finishes with the player's coordinate centroid on the opposite side of the wall, the character appears instantly on the outside.",
        mapping: "Provides an intuitive picture of finding oneself on the other side of an impassable barrier without climbing over.",
        where_it_breaks_down: "Game clipping is a floating-point discrete tick artifact in Newtonian simulation code; quantum tunneling is continuous, probabilistic, and fundamentally wave-mechanical."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: true,
      title: "Common Student Misconception vs. Scientific Reality",
      explanation_or_context: "Students frequently imagine that particles physically bore a tunnel, drill a hole, or lose velocity when traversing the barrier.",
      scientific_reality: "The particle does not bore a hole or touch the barrier; it never has a localized classical trajectory. Furthermore, transmitted particles emerge with the exact same energy E they started with—only the probability flux (wave amplitude) is diminished."
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: "Creator bounces a tennis ball against a brick wall. It bounces right back. Cut to close up of microchip.",
        on_screen_text: "Can a particle walk through walls? 🧱",
        voiceover_narration: "Throw a ball at a brick wall and it bounces off every single time. But zoom down to an electron, and it can literally materialize on the other side!"
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: "Animated wave packet approaching a dark energy bar. Most of the wave bounces, but a faint ghost-like wave ripples through and continues.",
        on_screen_text: "Quantum Wavefunction: ψ(x) leaks through!",
        voiceover_narration: "In quantum mechanics, particles aren't tiny billiard balls—they are clouds of probability called wavefunctions. When this wave hits an energy wall it doesn't have the energy to climb, it doesn't stop instantly. An evanescent wave leaks inside, decaying exponentially. If the barrier is nanometers thin, that probability wave makes it to the other side!"
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: "Creator holds up a smartphone and points to the sun in the sky.",
        on_screen_text: "Without tunneling: No Sun, No Tech! ☀️",
        voiceover_narration: "Without quantum tunneling, the Sun wouldn't burn—protons could never overcome electrostatic repulsion to fuse. And the flash memory in your smartphone would literally stop working. You exist because waves leak!"
      }
    },
    demonstrations: {
      diy_household: {
        title: "Frustrated Total Internal Reflection with Two Glass Prisms / Water Glasses",
        materials: [
          "Two clean, smooth-bottom glass tumblers or glass microscope slides",
          "Clean water with a dropper",
          "Handheld red or green laser pointer"
        ],
        steps: [
          "Shine laser through the side of a glass tumbler so it strikes the inner wall at an angle greater than the critical angle (~48° in water), observing total internal reflection.",
          "Bring a second flat glass slide with a microscopic water film into contact with the reflection point.",
          "Watch the reflected beam dim as light suddenly transmits across the thin barrier into the second glass plate."
        ],
        safety_notice: "Never point laser pointers at eyes, reflective mirrors, or moving vehicles."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Microwave transmitter and receiver (3 cm wavelength, ~10 GHz)",
          "Two large paraffin wax or styrene prisms with 45° faces",
          "Millivoltmeter detector"
        ],
        setup_summary: "Align the microwave beam into the first wax prism to create total internal reflection with zero signal on the receiver. Bring the second wax prism parallel to the hypotenuse face. As the air gap narrows below 3 cm (the microwave wavelength), the receiver detects transmitted microwave intensity that decays exponentially with gap distance L.",
        safety_notice: "Do not stand directly in high-power microwave transmitter horns."
      },
      digital_simulation: {
        concept_visualized: "1D Schrödinger time-dependent wavepacket transmission across rectangular potential barrier",
        suggested_tool_or_animation_flow: "PhET Quantum Tunneling and Wave Packets simulator with adjustable barrier width and particle energy sliders."
      }
    }
  },

  "Total Internal Reflection": {
    concept_name: "Total Internal Reflection",
    target_audience: "Class 10",
    difficulty_level: "Intermediate",
    language: "English",
    scientific_status: {
      category: "Established Empirical Law / Finding",
      scope_note: "Direct exact consequence of Snell's Law of refraction and electromagnetic boundary conditions at the dielectric interface between higher and lower refractive index media."
    },
    core_intuition: "When light tries to leave a denser medium (like water or glass) into a rarer medium at too shallow an angle, it gets 100% bounced back inside like an unbeatable mirror.",
    explanation: "According to Snell's Law, when light travels from an optically denser medium of refractive index n₁ to a rarer medium n₂ (where n₁ > n₂), the refracted ray bends away from the normal. As the angle of incidence increases, the angle of refraction reaches 90° at a specific angle called the Critical Angle θc = arcsin(n₂/n₁). For any angle of incidence greater than θc, no refraction can occur: all light energy is reflected back into the denser medium.",
    mathematics: {
      has_formula: true,
      latex_formula: "\\sin \\theta_c = \\frac{n_2}{n_1} \\quad (n_1 > n_2)",
      variables: [
        {
          symbol: "\\theta_c",
          meaning: "Critical angle of incidence",
          si_unit: "Degree (°) or Radian"
        },
        {
          symbol: "n_1",
          meaning: "Refractive index of incident (denser) medium",
          si_unit: "Dimensionless"
        },
        {
          symbol: "n_2",
          meaning: "Refractive index of refracting (rarer) medium",
          si_unit: "Dimensionless"
        }
      ],
      validity_conditions: "Requires n₁ > n₂ (light must travel from denser to rarer medium) and angle of incidence θ > θc."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: "Skipping Stones Across a Calm Lake",
        story: "Throw a flat stone straight down into a swimming pool and it pierces the surface and sinks straight to the bottom. But throw that stone at a very shallow, skimming angle across a glassy lake, and the water surface acts like a trampoline, skipping the stone back into the air.",
        mapping: "Steep angles penetrate the boundary; shallow grazing angles (greater than critical threshold) bounce back completely.",
        where_it_breaks_down: "Stones skip due to fluid dynamic lift and hydrodynamic stagnation pressure, whereas light reflects due to electromagnetic field boundary continuity."
      },
      {
        theme: "Mechanical / Tactile",
        title: "The Slanted Pinball Bumper Rail",
        story: "In a pinball machine, shoot a steel ball straight up at an angle through the main lane, and it clears into the upper deck. But shoot it at an angle glancing against the side guide rail, and the angled barrier sends it rebounding smoothly down the channel.",
        mapping: "The boundary forces the path to remain confined inside the playing board channel.",
        where_it_breaks_down: "Pinball rebound involves coefficient of restitution, acoustic clatter, and energy loss, whereas TIR is 100% lossless with zero absorption."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Undersea Fiber Optic Internet Cables",
        story: "When you stream a 4K movie or play online multiplayer across continents, light pulses travel through glass strands thinner than human hair laid across the Atlantic seabed. The light bounces millions of times off the glass cladding without losing intensity.",
        mapping: "The glass core has a higher refractive index than the outer cladding, trapping information signals across thousands of kilometers via continuous TIR.",
        where_it_breaks_down: "Real glass fiber experiences microscopic Rayleigh scattering and material absorption over long distances, requiring periodic erbium optical amplifiers."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: true,
      title: "Common Student Misconception vs. Scientific Reality",
      explanation_or_context: "Students frequently assume Total Internal Reflection can occur when light travels in any direction, such as from air into glass.",
      scientific_reality: "TIR can ONLY occur when light travels from an optically DENSER medium toward an optically RARER medium (n₁ > n₂). Light passing from air into glass will always bend toward the normal and penetrate the interface, regardless of the angle."
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: "Creator shines a green laser into a plastic water bottle with a small hole leaking a stream of water into a bucket. The laser light bends and gets trapped inside the curved water stream!",
        on_screen_text: "Can you bend a laser beam with water?! 💡🌊",
        voiceover_narration: "Light travels in straight lines—unless you trap it! Watch this laser beam literally bend inside an arching stream of water!"
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: "Close up diagram showing the laser hitting the inner water-air boundary at an angle steeper than 48.6 degrees and bouncing repeatedly like a zigzag.",
        on_screen_text: "Total Internal Reflection: sin(θc) = n2 / n1",
        voiceover_narration: "Water is optically denser than air. When the light hits the water surface at a shallow angle greater than 48.6 degrees—the critical angle—the light cannot escape into the air. It bounces with 100% reflection, completely trapped inside the stream like an invisible mirror!"
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: "Creator points the illuminated water stream onto their fingertip, glowing green. Quick b-roll of glowing fiber optic lines.",
        on_screen_text: "The Secret Engine of Global Internet 🌐",
        voiceover_narration: "This isn't just a party trick: this exact physics powers high-speed fiber optic cables wrapping around the entire globe to bring you the internet today!"
      }
    },
    demonstrations: {
      diy_household: {
        title: "The Bending Laser Water Stream",
        materials: [
          "Clear 1-liter plastic bottle with smooth sides",
          "Small nail or pin to make a 3-4 mm hole near the bottom",
          "Clean water",
          "Handheld laser pointer",
          "Bowl or sink to catch the water stream"
        ],
        steps: [
          "Poke a clean, smooth 3-4 mm circular hole about 5 cm from the base of the plastic bottle.",
          "Cover hole with a finger, fill bottle with water, and place near the edge of a sink.",
          "Remove finger to let a smooth, laminar stream of water arc into the sink.",
          "Aim the laser pointer through the back of the bottle directly into the hole from behind.",
          "Watch the entire arcing stream glow as the laser beam zigzags inside via Total Internal Reflection."
        ],
        safety_notice: "Avoid direct eye exposure to laser beams and keep workspace dry around electrical plugs."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Semi-circular glass or acrylic block",
          "Ray box or diode laser with optical protractor disc",
          "White paper screen"
        ],
        setup_summary: "Direct a narrow ray of light through the curved surface of the semi-circular glass block toward the center of the flat edge (so it enters without refraction). Slowly rotate the disc to increase the incidence angle from 0° toward 42°. Observe the faint reflected ray grow stronger while the refracted ray grazes the flat edge at 90° (Critical Angle) before disappearing completely into 100% TIR.",
        safety_notice: "Handle optical glass blocks with care to prevent chipping edges or scratching polished optical surfaces."
      },
      digital_simulation: {
        concept_visualized: "Angular ray trajectory across refractive interface with critical angle threshold marker",
        suggested_tool_or_animation_flow: "PhET Bending Light interactive simulation showing ray and wave models across variable index boundaries."
      }
    }
  },

  "Photoelectric Effect": {
    concept_name: "Photoelectric Effect",
    target_audience: "Class 12",
    difficulty_level: "Intermediate",
    language: "English",
    scientific_status: {
      category: "Established Empirical Law / Finding",
      scope_note: "Empirical discovery by Hertz and Hallwachs, explained theoretically by Albert Einstein (1905) using localized energy quanta (photons), establishing light's wave-particle duality."
    },
    core_intuition: "Light is a volley of discrete photon bullets: no matter how bright a dim red light is, it cannot knock out an electron unless each individual photon bullet packs enough punch.",
    explanation: "Classical wave theory predicted that increasing light intensity would gradually deliver enough wave energy to eject electrons with a time delay. Experiments revealed the opposite: electron ejection is instantaneous, and no electrons are emitted below a threshold frequency ν₀ regardless of intensity. Einstein explained this by treating light as discrete packets of energy E = hν. An electron absorbs exactly one photon; part of this energy overcomes the metallic binding potential (Work Function Φ), and the remainder becomes maximum kinetic energy K_max.",
    mathematics: {
      has_formula: true,
      latex_formula: "K_{\\text{max}} = h\\nu - \\Phi = h(\\nu - \\nu_0)",
      variables: [
        {
          symbol: "K_{\\text{max}}",
          meaning: "Maximum kinetic energy of ejected photoelectrons",
          si_unit: "Joule (J) or Electron-volt (eV)"
        },
        {
          symbol: "h",
          meaning: "Planck's universal quantum constant (6.626 × 10⁻³⁴)",
          si_unit: "Joule-second (J·s)"
        },
        {
          symbol: "\\nu",
          meaning: "Frequency of incident electromagnetic radiation",
          si_unit: "Hertz (Hz) or s⁻¹"
        },
        {
          symbol: "\\Phi",
          meaning: "Work function of the emitting metal surface (hν₀)",
          si_unit: "Joule (J) or Electron-volt (eV)"
        },
        {
          symbol: "\\nu_0",
          meaning: "Threshold frequency required for emission",
          si_unit: "Hertz (Hz)"
        }
      ],
      validity_conditions: "Applies to single-photon absorption events in clean metals; multi-photon absorption occurs only at extreme laser intensities (> 10¹⁴ W/cm²)."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: "The $10 Vending Machine & Dime Showers",
        story: "A vending machine requires a single $10 bill to dispense a snack. You throw 1,000 one-cent pennies at the slot—nothing happens because the slot only accepts single bills of sufficient denomination. But insert one $20 bill, and you get the snack instantly plus $10 in change to sprint away with.",
        mapping: "Pennies represent low-frequency photons (high intensity, low individual energy). The $20 bill represents a high-frequency ultraviolet photon, and the change is kinetic energy.",
        where_it_breaks_down: "Vending machines count coins cumulatively over time, whereas photoemission does not accumulate energy across multiple sub-threshold photons under normal conditions."
      },
      {
        theme: "Mechanical / Tactile",
        title: "The Carnival Ring-Toss Bell Hammer",
        story: "At a carnival strongman game, gently tapping the lever 10,000 times with a feather will never ring the high bell. You must strike it with a single heavy sledgehammer swing carrying sufficient impulse in one impact to propel the puck all the way to the top.",
        mapping: "Light intensity is the number of swings per second; light frequency (color) is the weight and speed of the sledgehammer.",
        where_it_breaks_down: "Mechanical levers deform elastically and store slight residual strain, while quantum absorption is all-or-nothing without elastic pre-stretching."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Video Game Armor Penetration Thresholds",
        story: "In an RPG, an enemy has Armor Class 50. If you shoot 100 arrows doing 5 damage each, every arrow deals 0 effective damage (fully blocked). But switch to a high-tier sniper rifle doing 80 damage in a single shot, and you pierce the 50 armor, dealing 30 surplus critical damage.",
        mapping: "Armor Class is the metal's Work Function (Φ); the single sniper bullet is a high-frequency photon; the surplus damage is K_max.",
        where_it_breaks_down: "Game health bars deplete through algorithmic subtraction, whereas an electron either escapes entirely or remains in the Fermi sea."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: true,
      title: "Common Student Misconception vs. Scientific Reality",
      explanation_or_context: "Students frequently confuse light intensity with photon energy, assuming that 'brighter light ejects faster electrons'.",
      scientific_reality: "Brighter light of the same color simply means MORE photons, which ejects MORE electrons per second (higher photocurrent), but does NOT increase their speed! To increase electron speed, you must increase the frequency (color toward UV/blue), not brightness."
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: "Creator shines a blindingly bright red 1000-watt floodlight onto a zinc plate with an electroscope: leaves stay spread. Then turns on a tiny, dim ultraviolet penlight: leaves instantly collapse!",
        on_screen_text: "Why does dim purple beat blinding red?! 🔦⚡",
        voiceover_narration: "A blinding red floodlight does nothing, but a tiny dim UV penlight instantly knocks electrons off this metal plate! Why?"
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: "Animation of red photons bouncing harmlessly off metal electrons, then purple photons slamming in and kicking electrons flying out into the vacuum.",
        on_screen_text: "Einstein: E = hν (Photons are bullets!)",
        voiceover_narration: "Because light isn't a continuous wave—it's made of quantum bullets called photons! Red photons are lightweight ping-pong balls; having billions of them doesn't help. But ultraviolet photons are heavy sledgehammers. Each single UV photon carries enough punch to pay the metal's exit fee and kick an electron out into space!"
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: "Creator points to rooftop solar panels and supermarket automatic door sensors.",
        on_screen_text: "The Spark of Quantum Physics ☀️",
        voiceover_narration: "This discovery won Albert Einstein his Nobel Prize—and today it powers every solar panel on Earth and the camera sensor inside your smartphone!"
      }
    },
    demonstrations: {
      diy_household: {
        title: "Gold-Leaf Electroscope & UV LED Discharge",
        materials: [
          "DIY jar electroscope made with aluminum foil leaves and copper wire",
          "Zinc or freshly polished aluminum plate",
          "UV 365nm flashlight or blacklight LED",
          "Standard bright incandescent flashlight",
          "PVC rod and wool cloth to negatively charge the electroscope"
        ],
        steps: [
          "Rub the PVC rod with wool and touch the zinc plate to charge the electroscope negatively; foil leaves diverge.",
          "Shine the bright visible flashlight onto the zinc plate: leaves remain separated.",
          "Now shine the UV 365nm flashlight onto the clean zinc surface: leaves instantly collapse together as electrons escape.",
          "Repeat with positively charged electroscope: leaves do NOT collapse, proving only electrons are ejected."
        ],
        safety_notice: "Avoid looking directly into ultraviolet LED flashlights; wear UV-blocking safety glasses."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Vacuum phototube with cesium or potassium cathode",
          "Monochromatic spectral filters (Red, Yellow, Green, Blue, UV)",
          "Variable reverse voltage power supply (0 to -5 V)",
          "Sensitive picoammeter"
        ],
        setup_summary: "Illuminate phototube with different monochromatic wavelengths. Increase reverse stopping potential V₀ until photocurrent drops exactly to zero. Plot V₀ versus frequency ν: the slope yields Planck's constant h/e, and the x-intercept reveals threshold frequency ν₀.",
        safety_notice: "Use low-voltage DC supplies; do not touch high-intensity mercury discharge lamps while hot."
      },
      digital_simulation: {
        concept_visualized: "Dynamic electron emission rate vs. retarding voltage curves for variable metal targets",
        suggested_tool_or_animation_flow: "PhET Photoelectric Effect interactive simulator with adjustable target metals, intensity slider, and wavelength tuning."
      }
    }
  },

  "Time Dilation": {
    concept_name: "Time Dilation (Special Relativity)",
    target_audience: "Class 12",
    difficulty_level: "Intermediate",
    language: "English",
    scientific_status: {
      category: "Established Empirical Law / Finding",
      scope_note: "Direct consequence of Einstein's postulates of Special Relativity (1905), experimentally validated using atmospheric muon lifetimes, atomic clocks on aircraft (Hafele-Keating), and GPS satellite constellations."
    },
    core_intuition: "You travel through spacetime at one universal speed—the speed of light; if you divert some of that speed into moving across space, your clock has less speed left to tick through time.",
    explanation: "Because the speed of light c in vacuum is universally invariant for all inertial observers, two observers moving relative to each other cannot agree on the time elapsed between events. For an observer moving at velocity v, a light ray bouncing between two mirrors inside a moving train must traverse a longer diagonal path than seen inside the train. Since light speed is fixed, the longer path means more time must elapse for the stationary observer: moving clocks tick slower by the Lorentz factor γ = 1/√(1 - v²/c²).",
    mathematics: {
      has_formula: true,
      latex_formula: "\\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - \\frac{v^2}{c^2}}} = \\gamma \\Delta t_0",
      variables: [
        {
          symbol: "\\Delta t",
          meaning: "Dilated time interval measured by stationary observer",
          si_unit: "Second (s)"
        },
        {
          symbol: "\\Delta t_0",
          meaning: "Proper time measured in rest frame of the clock",
          si_unit: "Second (s)"
        },
        {
          symbol: "v",
          meaning: "Relative velocity between reference frames",
          si_unit: "Meters per second (m/s)"
        },
        {
          symbol: "c",
          meaning: "Speed of light in vacuum (299,792,458 m/s)",
          si_unit: "Meters per second (m/s)"
        },
        {
          symbol: "\\gamma",
          meaning: "Lorentz contraction factor",
          si_unit: "Dimensionless (≥ 1)"
        }
      ],
      validity_conditions: "Applies to inertial frames in Special Relativity; General Relativity adds gravitational potential time dilation near massive bodies."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: "The Constant-Speed Car Heading Northeast",
        story: "Your car has a cruise control locked at exactly 100 km/h. If you drive due North, your Northward speed is 100 km/h. But if you steer North-East, your speedometer is still 100 km/h, but your Northward progress drops to 70 km/h because some of your speed is now diverted Eastward.",
        mapping: "Northward progress is moving through time; Eastward progress is moving through space. Moving faster through space automatically steals from your progress through time.",
        where_it_breaks_down: "Euclidean vector addition uses Pythagoras with a plus sign (a² + b² = c²), whereas Minkowski spacetime uses a hyperbolic minus sign (s² = c²t² - x²)."
      },
      {
        theme: "Mechanical / Tactile",
        title: "The Bouncing Ping-Pong Ball on a Moving Train",
        story: "Two passengers play table tennis on a speeding bullet train, bouncing the ball vertically up and down. To them, the ball travels 1 meter straight up and 1 meter down. But to an observer standing by the railroad tracks, the ball traces a stretched, diagonal zigzag several meters long.",
        mapping: "If the ball were a photon of light whose speed cannot speed up or slow down, the longer diagonal path forces each bounce (tick of time) to take longer.",
        where_it_breaks_down: "A physical ping-pong ball inherits the train's forward momentum and moves faster relative to the ground; light speed c does not change with source velocity."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Interstellar's Miller's Planet & GPS Clock Drift",
        story: "In the movie Interstellar, spending 1 hour on Miller's ocean planet equals 7 years on Earth. Even more relatable: every GPS satellite orbiting Earth has atomic clocks that tick 38 microseconds faster per day due to relativistic velocity and gravity. If engineers did not correct this, Google Maps would drift by 11 kilometers every single day!",
        mapping: "Demonstrates that time dilation is not science fiction—it is a physical engineering reality in your pocket.",
        where_it_breaks_down: "Miller's planet is primarily gravitational time dilation from a supermassive black hole (General Relativity), while special relativity velocity dilation ticks slower."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: true,
      title: "Common Student Misconception vs. Scientific Reality",
      explanation_or_context: "Students frequently imagine that time dilation is a perceptual trick or optical illusion caused by the delay of light reaching our eyes.",
      scientific_reality: "Time dilation is NOT an optical illusion or signal delay. Moving clocks physically accumulate fewer ticks. Biological cells age slower, radioactive particles decay slower, and atomic resonances literally run at a different rate."
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: "Creator holds two identical ticking clocks. Creator grabs one and sprints full speed down the hallway while the other stays on the desk.",
        on_screen_text: "Does moving make you age slower?! ⏳🚀",
        voiceover_narration: "If you sprint fast enough, your watch ticks slower than your friend sitting on the couch. This isn't science fiction—it's Einstein's Special Relativity!"
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: "Light clock diagram: photon bouncing vertically between two mirrors inside a stationary box vs. tracing a long diagonal zigzag in a moving spaceship.",
        on_screen_text: "The Cosmic Speed Limit: c is constant!",
        voiceover_narration: "Imagine a clock that ticks each time a light beam bounces between two mirrors. When stationary, the beam goes straight up and down. But put that clock inside a rocket, and to an outside observer, the light must travel along a longer diagonal path! Because the speed of light can never speed up to compensate, that longer trip takes more time. Moving clocks tick slower!"
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: "Close up of smartphone screen showing Google Maps pin accurately placed on creator's location.",
        on_screen_text: "Your GPS relies on Einstein 📍",
        voiceover_narration: "Right now, GPS satellites traveling at 14,000 km/h experience this exact time warp. Without relativistic clock corrections, your GPS map would be off by 11 kilometers every day!"
      }
    },
    demonstrations: {
      diy_household: {
        title: "Atmospheric Muon Decay Paper & Stopwatch Analogy",
        materials: [
          "Smartphone timer / stopwatch",
          "Pencil and paper to sketch Minkowski light cones",
          "Calculated table of muon half-lives (2.2 microseconds at rest)"
        ],
        steps: [
          "Explain the cosmic ray muon paradox: muons created 15 km high in the upper atmosphere have a rest lifetime of only 2.2 μs.",
          "At light speed, they should only travel 660 meters before decaying, yet millions strike ground detectors every minute.",
          "Calculate with γ = 20 (v = 0.999c): dilated lifetime becomes 44 μs, allowing them to travel 13 km to sea level.",
          "Demonstrates direct physical confirmation without needing spaceships."
        ],
        safety_notice: "Standard safe tabletop educational calculation."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Cosmic ray scintillator detector paddle or cloud chamber",
          "Photomultiplier tube (PMT) with coincidence circuit",
          "High-speed oscilloscope or digital counter"
        ],
        setup_summary: "Set up two scintillator detector paddles separated vertically. Count muon arrival coincidence rates at sea level and compare with theoretical non-relativistic survival expectations to demonstrate relativistic lifetime dilation.",
        safety_notice: "Ensure PMT high-voltage power supply (1-2 kV) connections are properly insulated."
      },
      digital_simulation: {
        concept_visualized: "Interactive light-clock simulation showing photon path elongation and Lorentz factor curve γ(v)",
        suggested_tool_or_animation_flow: "Interactive relativity simulation with velocity slider from 0 to 0.99c displaying synchronized twin clocks."
      }
    }
  },

  "Archimedes' Principle": {
    concept_name: "Archimedes' Principle (Buoyancy)",
    target_audience: "Class 9",
    difficulty_level: "Beginner",
    language: "English",
    scientific_status: {
      category: "Established Empirical Law / Finding",
      scope_note: "Fundamental law of hydrostatics derived from static fluid pressure gradients in gravitational fields."
    },
    core_intuition: "When an object enters fluid, the fluid pushes upward with a buoyant force equal to the exact weight of fluid shoved out of the way.",
    explanation: "Fluids exert pressure equally in all directions at a given depth, but hydrostatic pressure increases with depth due to gravity (P = ρgh). The bottom of an immersed object is deeper than the top, so the upward pressure force against the bottom is always greater than the downward pressure force on the top. The net upward resultant force is buoyancy, equal to the weight of the displaced liquid volume.",
    mathematics: {
      has_formula: true,
      latex_formula: "F_b = \\rho_f \\cdot V_{\\text{disp}} \\cdot g",
      variables: [
        {
          symbol: "F_b",
          meaning: "Upward buoyant force",
          si_unit: "Newton (N)"
        },
        {
          symbol: "\\rho_f",
          meaning: "Density of the fluid",
          si_unit: "kg/m³"
        },
        {
          symbol: "V_{\\text{disp}}",
          meaning: "Volume of displaced fluid",
          si_unit: "Cubic meter (m³)"
        },
        {
          symbol: "g",
          meaning: "Gravitational acceleration (9.81)",
          si_unit: "m/s²"
        }
      ],
      validity_conditions: "Requires static incompressible fluid in uniform gravity. Does not apply in microgravity (g = 0)."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: "Crowded Elevator Displacement",
        story: "A crowded elevator has no empty floor space. A large football player pushes his way inside, forcing three smaller people to squeeze out onto the landing. The elevator passengers push back with collective pressure proportional to how many people were displaced.",
        mapping: "The volume of space taken up determines how much collective fluid pushback occurs.",
        where_it_breaks_down: "People push back with emotional frustration; fluid pushes back strictly due to hydrostatic vertical pressure differences."
      },
      {
        theme: "Mechanical / Tactile",
        title: "Compressed Spring Mattress Cushion",
        story: "When you sit on a pocket-spring mattress, the springs compress downward. The deeper you sink, the more spring coils push upward against your body until the spring force balances your weight.",
        mapping: "Deeper immersion corresponds to greater displaced fluid and stronger upward supporting force.",
        where_it_breaks_down: "Springs obey Hooke's law (linear displacement), while fluid buoyancy depends on displaced volume regardless of container shape."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Cargo Ships & Submarine Ballast Tanks",
        story: "A steel aircraft carrier weighs 100,000 tons. Steel is 8 times denser than water, yet the ship floats because its hollow hull displaces more than 100,000 tons of seawater before sinking. Submarines flood internal ballast tanks with water to sink, and blow compressed air into the tanks to surface.",
        mapping: "Shape and hollow air volume dictate total displaced weight.",
        where_it_breaks_down: "Hull structural flexing and salt salinity gradients modify local displacement."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: true,
      title: "Common Student Misconception vs. Scientific Reality",
      explanation_or_context: "Students frequently believe heavy objects sink because 'heavy things can't float', confusing total weight with density and displaced volume.",
      scientific_reality: "A 100,000-ton aircraft carrier floats easily, while a tiny 1-gram pebble sinks to the bottom. Floating depends exclusively on average density and whether displaced fluid weight matches total weight."
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: "Creator drops a 50g solid iron ball into water (sinks like a stone). Then shapes 50g of aluminum foil into a boat and loads 10 heavy coins into it (it floats high!).",
        on_screen_text: "Same weight: Why does one float?! 🚢⚓",
        voiceover_narration: "A solid metal ball sinks instantly. But shape the exact same amount of metal into a boat, and it floats like a champion! How?"
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: "3D graphic showing water pressure pushing up from below. Overflow can with displaced water pouring into a beaker.",
        on_screen_text: "Archimedes: Buoyant Force = Displaced Water Weight",
        voiceover_narration: "Archimedes discovered this in his bathtub! The water under any object exerts upward pressure. The force pushing up is equal to the exact weight of water pushed out of the way. The boat hull displaces a massive volume of water, creating an upward force bigger than the boat's weight!"
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: "Creator places a toy submarine in a tank and watches it rise as air bubbles purge the tanks.",
        on_screen_text: "Eureka! From bathtubs to submarines 🌊",
        voiceover_narration: "That is why 100,000-ton steel cruise ships conquer the oceans. Shape is destiny in fluid physics!"
      }
    },
    demonstrations: {
      diy_household: {
        title: "The Floating Clay Boat Challenge",
        materials: [
          "Modeling clay or playdough (non-hardening)",
          "Large transparent bowl or basin of water",
          "Metal coins or marbles for cargo test"
        ],
        steps: [
          "Roll clay into a tight solid ball and drop it into water: it sinks to the bottom.",
          "Retrieve the clay, knead and shape it into a wide, hollow canoe/bowl shape.",
          "Gently place it on the water: it floats stably.",
          "Count how many coins it can hold before the water spills over the rim."
        ],
        safety_notice: "Wipe up water spills immediately to avoid slippery floors."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Eureka overflow can with spout",
          "Spring dynamometer (0-5 N)",
          "Brass or aluminum cylindrical weight",
          "Measuring graduated cylinder and balance"
        ],
        setup_summary: "Weigh metal cylinder in air. Fill overflow can until water barely trickles out of spout. Lower cylinder into water while hanging from spring balance: observe apparent weight loss. Catch overflow water in graduated cylinder and weigh it: the weight of displaced water exactly matches the apparent weight loss.",
        safety_notice: "Place a spill tray beneath overflow can."
      },
      digital_simulation: {
        concept_visualized: "Density comparison and buoyant force vector balance",
        suggested_tool_or_animation_flow: "PhET Density and Buoyancy simulator with custom block density and fluid selection."
      }
    }
  }
};

/**
 * Fuzzy matcher to find matching presets based on keywords
 */
export function findPresetOrFuzzyMatch(query: string): PhysicsEngineResponse | null {
  if (!query) return null;
  const q = query.trim().toLowerCase();

  // Exact match
  for (const [key, preset] of Object.entries(SAMPLE_PRESETS)) {
    if (key.toLowerCase() === q || preset.concept_name.toLowerCase() === q) {
      return preset;
    }
  }

  // Keyword mappings
  const keywordMap: Record<string, string> = {
    lenz: "Lenz's Law",
    eddy: "Lenz's Law",
    induction: "Lenz's Law",
    electromagnetic: "Lenz's Law",
    faraday: "Lenz's Law",
    bernoulli: "Bernoulli's Principle",
    venturi: "Bernoulli's Principle",
    fluid: "Bernoulli's Principle",
    lift: "Bernoulli's Principle",
    airplane: "Bernoulli's Principle",
    aerodynamics: "Bernoulli's Principle",
    tunnel: "Quantum Tunneling",
    tunneling: "Quantum Tunneling",
    quantum: "Quantum Tunneling",
    schrodinger: "Quantum Tunneling",
    wavefunction: "Quantum Tunneling",
    tir: "Total Internal Reflection",
    "internal reflection": "Total Internal Reflection",
    refraction: "Total Internal Reflection",
    critical: "Total Internal Reflection",
    fiber: "Total Internal Reflection",
    snell: "Total Internal Reflection",
    photoelectric: "Photoelectric Effect",
    photon: "Photoelectric Effect",
    workfunction: "Photoelectric Effect",
    einstein: "Photoelectric Effect",
    light: "Photoelectric Effect",
    dilation: "Time Dilation",
    relativity: "Time Dilation",
    time: "Time Dilation",
    lorentz: "Time Dilation",
    speedoflight: "Time Dilation",
    buoyancy: "Archimedes' Principle",
    archimedes: "Archimedes' Principle",
    float: "Archimedes' Principle",
    floating: "Archimedes' Principle",
    submarines: "Archimedes' Principle"
  };

  for (const [kw, targetKey] of Object.entries(keywordMap)) {
    if (q.includes(kw)) {
      return SAMPLE_PRESETS[targetKey] || null;
    }
  }

  return null;
}

/**
 * Fallback synthesizer for any unknown physics concept when API quota is exhausted
 */
export function synthesizeOfflinePhysicsResponse(
  topic: string,
  targetAudience: TargetAudience = "Class 12",
  difficultyLevel: DifficultyLevel = "Intermediate",
  language: LanguageOption = "English"
): PhysicsEngineResponse {
  const cleanTitle = topic.trim();

  return {
    concept_name: cleanTitle,
    target_audience: targetAudience,
    difficulty_level: difficultyLevel,
    language: language,
    generation_source: 'offline_fallback',
    is_quota_exhausted: true,
    quota_notice: "Generated via Pedagogical Offline Intelligence (Free-Tier API daily quota reached). Add a billing-enabled key in Settings > Secrets to unlock unlimited real-time Gemini reasoning.",
    scientific_status: {
      category: "Established Empirical Law / Finding",
      scope_note: `Core operational framework of ${cleanTitle} formulated within classical or modern physical mechanics.`
    },
    core_intuition: `In ${cleanTitle}, nature balances energy, momentum, or fields through strict conservation laws and boundary continuity.`,
    explanation: `${cleanTitle} describes how physical observables interact under fundamental constraints. For ${targetAudience} at ${difficultyLevel} level, the focus is on recognizing the causal relationship: when state parameters are altered, the physical system responds according to invariant equations of state, ensuring energy and flux remain conserved.`,
    mathematics: {
      has_formula: difficultyLevel !== 'Beginner',
      latex_formula: difficultyLevel !== 'Beginner' ? "\\sum F = m a \\quad \\text{or} \\quad \\Delta E = 0" : null,
      variables: [
        {
          symbol: "F",
          meaning: "Net physical force or field interaction",
          si_unit: "Newton (N) or Field Unit"
        },
        {
          symbol: "m",
          meaning: "Inertial mass or coupling parameter",
          si_unit: "kg"
        },
        {
          symbol: "a",
          meaning: "Acceleration or field gradient",
          si_unit: "m/s²"
        }
      ],
      validity_conditions: "Standard physical boundary conditions apply within macroscopic non-relativistic frames unless quantum scale applies."
    },
    analogies: [
      {
        theme: "Everyday Life",
        title: `The Balancing Teeter-Totter of ${cleanTitle}`,
        story: `Think of a balanced playground see-saw. When weight shifts to one side, the opposite side elevates in direct proportion to preserve the rotational pivot equilibrium.`,
        mapping: `The mechanical lever balance directly reflects how the inputs and outputs of ${cleanTitle} adjust to maintain conservation equilibrium.`,
        where_it_breaks_down: `Physical see-saws involve friction at the pivot and rigid timber beams, whereas ${cleanTitle} operates across continuous fields or quantum amplitudes.`
      },
      {
        theme: "Mechanical / Tactile",
        title: "The Counter-Weighted Elevator Cable",
        story: "In an elevator shaft, a heavy steel counterweight is connected over a pulley. As the passenger car descends, the counterweight rises, reducing the net motor energy required to operate the system.",
        mapping: "The counter-weighting illustrates how conjugate physical variables offset each other.",
        where_it_breaks_down: "Mechanical cables undergo elastic elongation and pulley bearing friction."
      },
      {
        theme: "Pop Culture / Modern Tech",
        title: "Video Game Physics Engine State Balancing",
        story: "In a physics sandbox game like Portal or Kerbal Space Program, the physics engine updates every frame to ensure velocity vectors and momentum matrices do not produce runaway energy glitches.",
        mapping: "Digital simulation constraints mirror the immutable physical conservation laws underlying this topic.",
        where_it_breaks_down: "Game physics calculations use discrete fixed time-step Euler or Verlet integration subject to rounding errors."
      }
    ],
    misconception_or_boundary: {
      has_documented_misconception: false,
      title: "Key Scientific Assumption & Boundary Condition",
      explanation_or_context: `Students often over-extend the domain of ${cleanTitle} beyond its intended operational regime.`,
      scientific_reality: `The principle requires defined thermodynamic and reference boundary conditions. When extreme relativistic speeds (v → c) or Planck-scale dimensions (h) are reached, quantum or relativistic corrections must be incorporated.`
    },
    video_script: {
      target_duration: "Approximately 60 seconds",
      hook_act1: {
        timecode: "0:00 - 0:10",
        visual_direction: `Creator presents an intriguing visual paradox relating to ${cleanTitle} with a sudden surprising movement on screen.`,
        on_screen_text: `The Secret of ${cleanTitle} Revealed! ⚡`,
        voiceover_narration: `Did you know that ${cleanTitle} governs almost everything you see around you, yet most people completely misunderstand how it works?`
      },
      explanation_act2: {
        timecode: "0:10 - 0:45",
        visual_direction: `Graphic overlay showing the core mechanism with animated arrows and proportional equations.`,
        on_screen_text: `Conservation & Intuition in Action! 🔬`,
        voiceover_narration: `At its core, ${cleanTitle} is all about balance. When you push on one side of the system, nature responds with an exact, predictable counter-reaction that preserves the fundamental laws of physics!`
      },
      payoff_act3: {
        timecode: "0:45 - 1:00",
        visual_direction: `Creator wraps up with a high-energy takeaway and links it to modern technology.`,
        on_screen_text: `From Basic Principles to Modern Tech! 🚀`,
        voiceover_narration: `Master this one concept, and you understand the foundational architecture of the physical universe!`
      }
    },
    demonstrations: {
      diy_household: {
        title: `Desktop Tabletop Demonstration of ${cleanTitle}`,
        materials: [
          "Standard household glass tumblers",
          "Smooth tabletop surface",
          "Lightweight ball or ruler for scale"
        ],
        steps: [
          "Set up the demonstration on a flat horizontal table.",
          "Introduce the test disturbance and observe the immediate physical response.",
          "Record differences between qualitative expectation and measured outcome."
        ],
        safety_notice: "Follow standard tabletop precautions and keep liquids away from electrical plugs."
      },
      school_lab: {
        applicable: true,
        apparatus: [
          "Standard physics lab benchmark apparatus",
          "Digital stopwatch and calipers",
          "Mounting stands and clamps"
        ],
        setup_summary: "Configure the lab apparatus on a vibration-isolated bench. Take multiple baseline readings, apply controlled increments, and plot the response curve.",
        safety_notice: "Wear standard safety goggles and secure all mechanical clamps."
      },
      digital_simulation: {
        concept_visualized: `Interactive vector field and conservation parameter plot for ${cleanTitle}`,
        suggested_tool_or_animation_flow: "PhET Interactive Simulations or Python Manim animation showcasing dynamic vector transformations."
      }
    }
  };
}

/**
 * Adapts a preloaded benchmark preset to the user's explicitly selected target audience and difficulty level
 */
export function adaptPresetToAudienceAndDifficulty(
  preset: PhysicsEngineResponse,
  targetAudience: TargetAudience,
  difficultyLevel: DifficultyLevel,
  language: LanguageOption
): PhysicsEngineResponse {
  const adapted: PhysicsEngineResponse = JSON.parse(JSON.stringify(preset));
  adapted.target_audience = targetAudience;
  adapted.difficulty_level = difficultyLevel;
  adapted.language = language;
  adapted.generation_source = 'preloaded_preset';

  // Adjust mathematical presentation according to selected difficulty
  if (difficultyLevel === 'Beginner') {
    adapted.mathematics = {
      has_formula: false,
      latex_formula: null,
      variables: [],
      validity_conditions: adapted.mathematics.validity_conditions,
    };
  } else if (difficultyLevel === 'Advanced') {
    adapted.mathematics.has_formula = true;
  }

  return adapted;
}

