import { authQueryOptions } from "@/lib/auth/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { format } from "date-fns"

export const Route = createFileRoute("/_auth/contracts/employments/permanent")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useSuspenseQuery(authQueryOptions())

  const employer = "employeur"
  const collaborator = "collaborateur"

  return (
    <article className="prose prose-sm print:text-black">
      <header className="mb-8 flex h-16 justify-end">
        <img
          className="max-h-full max-w-full object-contain not-print:brightness-0 not-print:grayscale not-print:invert"
          src="https://assets.the-corner.io/logos/the_corner-logo.webp"
          alt="Logo"
        />
      </header>

      <h1 className="mb-6 text-center text-3xl font-bold">
        Contrat de travail de durée indéterminée
      </h1>

      <section className="mb-6">
        <p>
          Entre <span className="font-semibold">The Corner</span>, désignée ci-après par{" "}
          <code>{employer}</code>
          , et
          <br />
          {user?.honorificPrefix ?? "N/A"}{" "}
          <span className="font-semibold">{user?.name}</span>, né/e le{" "}
          <span className="font-semibold">
            {user?.birthDate ? format(user.birthDate, "dd.MM.yyyy") : "N/A"}
          </span>
          , désigné ci-après par <code>{collaborator}</code>, a été conclu, avec effet au{" "}
          <span className="font-semibold">
            {user?.startDate ? format(user.startDate, "dd.MM.yyyy") : "N/A"}
          </span>
          , le contrat suivant :
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 1</h2>
        <p>
          L'<code>{employer}</code> embauche {user?.honorificPrefix ?? "N/A"}{" "}
          <strong>{user?.name ?? "N/A"}</strong> en qualité de{" "}
          <span className="font-semibold">{user?.title ?? "N/A"}</span>.
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 2</h2>
        <p>
          Le <code>{collaborator}</code> consacrera tout son temps au service de l'
          <code>{employer}</code>, sauvegardera fidèlement et consciencieusement les
          intérêts de celui-ci et s'abstiendra, sauf autorisation, de toute autre activité
          accessoire salariée.
        </p>
        <p>
          Le <code>{collaborator}</code> s'engage, en outre, à considérer comme secret
          professionnel, aussi bien pendant la durée de son engagement qu'après la fin de
          celui-ci, les connaissances de toute nature acquises. Il s'abstiendra, par
          conséquent, de les communiquer à des tiers. Une discrétion absolue devra
          également être observée concernant ses conditions de rémunération.
        </p>
        <p>
          Il est interdit au <code>{collaborator}</code> de copier pour son propre usage
          tout document ou de conserver des documents de ce genre lorsqu'il quitte le
          service de l'
          <code>{employer}</code>.
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 3</h2>
        <p className="italic">A choix suivant si temps d'essai ou non</p>
        <p>
          <span className="underline">Temps d'essai OUI :</span>
          <br />
          Les premiers trois mois sont considérés comme période d'essai durant laquelle
          l'engagement peut être dénoncé, de part et d'autre, moyennant préavis de 7
          jours.
          <br />
          Si les deux parties sont d'accord, l'engagement deviendra définitif dès la fin
          de la période d'essai.
          <br />
          La première année, le délai de résiliation sera d'un mois, de la deuxième à la
          neuvième année de service, il sera de deux mois et à compter de la dixième année
          de service, de trois mois. OU possible de fixer directement 3mois de délai de
          résiliation
        </p>
        <p>
          <span className="underline">Temps d'essai NON :</span>
          <br />
          Il n'y a pas de période d'essai.
          <br />
          La première année, le délai de résiliation sera d'un mois, de la deuxième à la
          neuvième année de service, il sera de deux mois et à compter de la dixième année
          de service, de trois mois. OU possible de fixer directement 3mois de délai de
          résiliation
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 4</h2>
        <p>
          Le <code>{collaborator}</code> se déclare d'accord d'être affilié à la Caisse de
          Pension de l'<code>{employer}</code>.
          <br />
          Le <code>{collaborator}</code> est assuré auprès de{" "}
          <span className="font-semibold">nom de l'assurance</span> pour les accidents
          professionnels et non-professionnels selon les dispositions de la LAA.
          <br />
          Le <code>{collaborator}</code> est assuré en perte de gain maladie.{" "}
          <span className="italic">A noter si conclu une assurance</span>
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 5</h2>
        <p>
          Il admet et observe les directives générales en vigueur, tels que règlements,
          prescriptions, instructions de service et instructions particulières de l'
          <code>{employer}</code> et de ses partenaires contractuels.
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 6</h2>
        <p>
          L'<code>{employer}</code> remboursera au <code>{collaborator}</code> les frais
          imposés par l'exécution de son travail.{" "}
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 7</h2>
        <p>
          Le salaire horaire de base s'élève à{" "}
          <span className="font-semibold">CHF {user?.salary ?? "N/A"} brut</span>.<br />
          Le salaire horaire de base est payé sur une base mensualisée en tenant compte
          d'un horaire de travail de <span className="font-semibold">XX</span>, pour un
          taux d'activité fixé à 100%. Le versement a lieu au plus tard au cinquième jour
          ouvrable du mois suivant.
          <br />
          Un treizième salaire est payé avec le salaire du mois de novembre de l'année en
          cours et représente l'indemnité de fin d'année.
        </p>
        <p>
          Le <code>{collaborator}</code> a droit à{" "}
          <span className="font-semibold">X</span> semaines de vacances par année civile.
          Si les rapports de travail durent moins d'une année complète, les vacances sont
          réduites de 1/12 par mois manquant. Les dates de vacances sont fixées d'entente
          avec l'<code>{employer}</code>.
        </p>
      </section>

      <section className="mb-4">
        <h2>Art. 8</h2>
        <p>
          Le présent contrat est soumis au droit suisse. Les parties conviennent que pour
          tout litige relevant de ce contrat, le for est celui de l'
          <code>{employer}</code>.
        </p>
      </section>

      <section className="mt-8 mb-4">
        <p className="mb-2">Pour accord :</p>
        <div className="flex flex-row gap-16 print:gap-8">
          {/* <code>{collaborator}</code> (Employé) */}
          <div className="flex flex-1 flex-col gap-4 print:gap-2">
            <div className="flex flex-col items-start">
              <div className="mt-8 mb-1 w-full border-t border-dashed"></div>
              <div className="flex gap-2 text-xs">
                <span>Lieu et date</span>
              </div>
            </div>
            <div className="mt-6 print:mt-4">
              <div className="mt-8 mb-1 w-full border-t border-dashed"></div>
              <span className="font-semibold">
                Signature du <code>{collaborator}</code>
              </span>
            </div>
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">{user?.name}</span>
            </div>
          </div>
          {/* <code>{employer}</code> */}
          <div className="flex flex-1 flex-col gap-4 print:gap-2">
            <div className="flex flex-col items-start">
              <div className="mt-8 mb-1 w-full border-t border-dashed"></div>
              <div className="flex gap-2 text-xs">
                <span>Lieu et date</span>
              </div>
            </div>
            <div className="mt-6 print:mt-4">
              <div className="mt-8 mb-1 w-full border-t border-dashed"></div>
              <span className="font-semibold">
                Signature de l'<code>{employer}</code>
              </span>
            </div>
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">Raphaël Balet</span>
              <br />
              <span className="font-semibold">CEO, The Corner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Espace réservé pour la clause légale à ajouter ultérieurement */}
    </article>
  )
}
