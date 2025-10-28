import Menu from "./Menu";

export default function Perspective() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Menu />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Perspective d’amélioration et modernisation
        </h1>
        <p className="text-gray-700 leading-relaxed space-y-4">
          Pour améliorer la fiabilité et la sécurité du système de pointage, il
          serait judicieux d’envisager le remplacement des cartes RFID par un
          capteur d’empreintes digitales. Cette solution présente plusieurs
          avantages :
          <span className="block mt-2">
            <strong className="text-blue-500">
              Élimination des oublis de carte :
            </strong>{" "}
            chaque collaborateur est identifié de manière unique, ce qui
            supprime la nécessité d’utiliser des cartes de remplacement et
            réduit les erreurs de pointage.
          </span>
          <span className="block mt-2">
            <strong className="text-blue-500">Sécurité renforcée :</strong> les
            empreintes digitales étant uniques à chaque individu, le risque
            d’usurpation ou de fraude est fortement diminué.
          </span>
          <span className="block mt-2">
            <strong className="text-blue-500">
              Simplification de la gestion RH :
            </strong>{" "}
            le suivi des heures d’entrée, de sortie et des pauses devient plus
            précis et plus fiable, réduisant ainsi la charge administrative liée
            aux corrections manuelles.
          </span>
          <span className="block mt-2">
            <strong className="text-blue-500">
              Modernisation du système :
            </strong>{" "}
            l’adoption de la biométrie constitue une étape vers un système de
            pointage plus innovant et performant, aligné avec les pratiques
            modernes de gestion du personnel.
          </span>
          <span className="block mt-2">
            <strong className="text-blue-500">Réduction des coûts :</strong> la
            société pourrait diminuer les dépenses liées à la création et à la
            gestion des cartes pour chaque nouveau collaborateur.
          </span>
        </p>
      </div>
    </main>
  );
}
