import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FooterKankaLogo } from '../components/FooterKanka';
import { FooterSocial } from '../components/FooterSocial';
import './santi-home.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Política de privacidade — Santi & Santi';
  }, []);

  return (
    <div className="santi-home santi-wine-page">
      <main className="santi-wine-main">
        <div className="santi-wine-back">
          <Link to="/" className="santi-wine-back__link">
            <span aria-hidden>←</span> Voltar ao início
          </Link>
        </div>
        <p className="santi-wine-breadcrumb">
          <Link to="/">Início</Link>
          <span className="santi-wine-breadcrumb__sep" aria-hidden>
            /
          </span>
          <span className="santi-wine-breadcrumb__current">Política de privacidade</span>
        </p>

        <header className="santi-legal-head">
          <h1 className="santi-title santi-wine-title">Política de privacidade e cookies</h1>
        </header>

        <article className="santi-legal">
          <section className="santi-legal__section" aria-labelledby="legal-cookies">
            <h2 id="legal-cookies" className="santi-legal__h2">
              Cookies
            </h2>
            <p>
              A Santi &amp; Santi Importadora e Distribuidora atua na importação e distribuição de
              bebidas.
            </p>
            <p>
              Neste site, utilizamos os cookies necessários para fazer o seu correto funcionamento.
            </p>
            <p>
              Os cookies são desde os PHP, em especial PHPSESSID, que é o identificador único de
              sessão e não coleta dados, até os fornecidos por terceiros como o Google Analytics
              (ferramenta de terceiro e com padrões próprios).
            </p>
            <p>
              Também podemos vir a utilizar cookies adicionais para analisar o tráfego em nosso
              site e os padrões de acesso dos nossos usuários, que nos ajudam a melhorar a
              experiência e o aproveitamento do site.
            </p>
            <p>
              Além disso, outros mecanismos como ferramentas de busca (exemplo, Google, Bing e
              similares) e redes sociais (exemplo, Facebook, Instagram ou similares) podem fornecer
              ferramentas no estilo de plug-ins, que se conectam ao site para gerar informações
              através de cookies e exibir anúncios relacionados.
            </p>
            <p>
              O fato do usuário ser impactado por anúncios referentes aos mesmos produtos ou
              serviços, não significa que foi identificado por visitar um website. Na maioria das
              vezes, essas informações são coletadas de forma anônima, com base no perfil de
              navegação, sem que sua identidade seja revelada.
            </p>
            <p>
              Destacamos que você, usuário, pode desabilitar esses cookies diretamente nas
              configurações de seu navegador, mas isso pode afetar a sua experiência em nosso site.
            </p>
            <p>
              Maiores informações sobre os cookies estão disponíveis em nossa Política de
              Privacidade.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-policy">
            <h2 id="legal-policy" className="santi-legal__h2">
              Política de privacidade
            </h2>
            <p>
              Ao navegar no site da Santi &amp; Santi (
              <a href="https://www.santiesantiimportadora.com.br" className="santi-legal__link">
                www.santiesantiimportadora.com.br
              </a>
              ), alguns dados pessoais poderão ser tratados.
            </p>
            <p>
              Nós somos comprometidos com a segurança dos seus dados pessoais e neste documento
              ajudaremos você, usuário, a compreender quais são as nossas práticas em relação à
              proteção de dados, com a descrição de quais são as informações coletadas, como são
              usadas e compartilhadas.
            </p>
            <p>
              Sempre que você fornecer informações pessoais, trataremos essas informações de acordo
              com esta Política. Em todos os momentos, esforçamo-nos para manter seus dados precisos
              e seguros.
            </p>
            <p className="santi-legal__notice">
              RECOMENDAMOS QUE ESTE DOCUMENTO SEJA LIDO COM ATENÇÃO. NELE ESTÁ DESCRITA A FORMA COMO
              SÃO TRATADAS AS INFORMAÇÕES PESSOAIS FORNECIDAS POR VOCÊ PARA ACESSAR NOSSO SITE E
              UTILIZAR NOSSOS SERVIÇOS.
            </p>
            <p className="santi-legal__notice">
              AO LER O TEXTO ABAIXO E CLICAR EM &quot;LI E ACEITO&quot;, VOCÊ AFIRMA CONHECER E
              ENTENDER OS TERMOS E CONDIÇÕES DA PRESENTE POLÍTICA DE PRIVACIDADE, CONSENTINDO ESTAR
              CONCORDANDO ÀS CONDIÇÕES DE FORMA LIVRE E ESPONTÂNEA.
            </p>
            <p>
              <strong>Última modificação:</strong> 06 de outubro de 2020.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-contact">
            <h2 id="legal-contact" className="santi-legal__h2">
              Fale conosco
            </h2>
            <p>
              Você pode falar conosco pelo telefone{' '}
              <a href="tel:+5541999336011" className="santi-legal__link">
                +55 (41) 99933-6011
              </a>{' '}
              ou enviando um e-mail para{' '}
              <a href="mailto:andre@santiesantiimportadora.com.br" className="santi-legal__link">
                andre@santiesantiimportadora.com.br
              </a>
              . O prazo de resposta é de até 2 (dois) dias úteis.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-collect">
            <h2 id="legal-collect" className="santi-legal__h2">
              Que tipo de informação são coletadas em nosso site
            </h2>
            <p>
              Nós coletamos algumas informações quando o usuário, titular dos dados pessoais, acessa
              nosso site ou utiliza os formulários das seções do site. Essas informações são
              importantes para que seja mantido um canal aberto de comunicação, com respostas ágeis
              e precisas com o usuário.
            </p>
            <p>A coleta será de forma direta quando o próprio usuário se utiliza dos meios abaixo:</p>
            <p>
              <strong>Formulários:</strong> ao entrar em contato conosco por meio do site, nós
              coletaremos alguns dados pessoais, tais como por exemplo, nome, e-mail e telefone para
              contato. Ao preencher o formulário, nós poderemos entrar em contato com o usuário para
              coletar informações adicionais necessárias para o atendimento da solicitação
              formulada.
            </p>
            <p>
              <strong>Informações de localização e navegação:</strong> A depender dos serviços
              utilizados em nosso site e das configurações do seu aparelho (smartphone), nós
              poderemos coletar, de forma precisa ou aproximada, sua localização por meio dos dados
              do GPS, endereço IP ou WiFi. Mantemos os seus dados por quanto tempo for necessário
              para fornecimento dos nossos serviços, envio de propostas, ofertas ou newsletters e
              divulgação de nossas parcerias. Caso não tenhamos sucesso no encaminhamento de e-mail,
              os seus dados permanecem armazenados em servidores de banco de dados que possuem
              sistemas de proteção (firewall) até o atingimento da finalidade para que foram
              coletados.
            </p>
            <p>
              E de forma indireta, a coleta de dados ocorre de forma automática, através de cookies
              de navegação, ferramentas de terceiros como Google Analytics e similares, ou ainda
              plug-ins de terceiros que funcionam a partir do navegador do próprio usuário.
            </p>
            <p>
              Os cookies são tratados em tópico próprio em nossa Política e desde já informamos que
              o usuário tem o direito de restringir o acesso a cookies ou navegar de forma anônima,
              configurando seu navegador por conta própria. Contudo, não descartamos que esta opção
              pode acarretar alguma inconsistência das funcionalidades do site ou blog, gerando uma
              navegação não satisfatória.
            </p>
            <p>
              Geralmente, os plug-ins estão anexados ao site ou ao blog desenvolvido na tecnologia
              WordPress. Não é possível identificarmos o usuário titular dos dados, em razão das
              próprias características de proteção à privacidade da internet. A coleta de dados de
              forma automática se dá através de um código de usuário anônimo, IP de acesso, tipo de
              dispositivo utilizado para navegação, data e hora de navegação, país de origem e
              outras informações gerais, de forma a tratar elas em relatórios de análises do site.
            </p>
            <p>
              Além disso, mecanismos de busca (exemplo, Google) e redes sociais (exemplo, Facebook,
              Instagram ou similares) podem fornecer ferramentas no estilo de plug-ins, que se
              conectam ao website para gerar informações através de cookies e exibir anúncios
              relacionados. O fato do usuário ser impactado por anúncios referentes aos mesmos
              produtos ou serviços, não significa identificação.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-why">
            <h2 id="legal-why" className="santi-legal__h2">
              Porque essas informações são coletadas
            </h2>
            <p>
              Os dados pessoais, definidos conforme legislação, que são tratados em razão do
              fornecimento direto pelo usuário, titular dos dados, permitem uma comunicação ágil e
              eficaz conosco, buscando sempre o melhor atendimento no menor tempo possível e
              aperfeiçoando a experiência e usufruto dos diversos serviços ofertados pela nossa
              empresa.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-use">
            <h2 id="legal-use" className="santi-legal__h2">
              Como as informações são usadas
            </h2>
            <p>
              Nós utilizamos as informações coletadas para propósitos específicos que incluem o
              fornecimento de serviços, agilidade na comunicação e divulgação de eventos e parcerias
              feitas pela nossa empresa e envio de newsletter e e-mail marketing aos usuários
              cadastrados, em razão do fornecimento consentido dos dados.
            </p>
            <p>
              Nós não tratamos dados que sejam relacionados a crimes, organizações criminosas ou
              terroristas. Dados pessoais enviados por menores de 18 anos também não são tratados
              sem o consentimento do responsável. Esses dados que porventura cheguem a nossa base
              serão imediatamente eliminados.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-share">
            <h2 id="legal-share" className="santi-legal__h2">
              Compartilhamento de informações
            </h2>
            <p>
              Exceto com relação aos cookies, cujas informações particulares você encontra no tópico
              próprio, não compartilhamos seus dados com terceiros, exceto para nossos parceiros de
              armazenamento das informações (proprietários dos servidores) ou em caso de
              obrigação/determinação judicial. Qualquer alteração desse padrão será sempre
              transparente e para fins específicos e previamente repassados para você.
            </p>
            <p>
              Entretanto, para o envio de newsletters ou contato comercial, atividades anteriormente
              mencionadas, eventualmente inserimos dados coletados em ferramentas de disparos
              (exemplo, Dinamize, SharpSpring ou outras similares) que possamos adotar para a mesma
              finalidade.
            </p>
            <p>
              Além disso, a hospedagem do site e ferramentas ocorre em data centers fora do Brasil,
              com fornecedores mundiais deste tipo de serviço.
            </p>
            <p>
              Lembre-se de que quando você usa um link para ir do nosso site para outro site ou
              solicitar um serviço de terceiros, nossa Política não se aplica mais. Sua navegação e
              interação em qualquer outro website ou suas negociações com qualquer outro provedor
              de serviços de terceiros estão sujeitas às regras e políticas do próprio provedor de
              serviços de terceiros ou do próprio site. Nós não monitoramos, controlamos ou endossamos
              a coleta de informações ou práticas de privacidade de terceiros. Incentivamos você a
              se familiarizar com as práticas de privacidade de todos os sites que você visita ou com
              o provedor de serviços terceirizado com os quais você lida e para contatá-los caso
              tenha alguma dúvida sobre suas respectivas políticas e práticas de privacidade. Esta
              Política aplica-se unicamente aos coletados por nós através do nosso site ou serviços
              e não se aplica a esses sites de terceiros e provedores de serviços terceirizados.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-rights">
            <h2 id="legal-rights" className="santi-legal__h2">
              Direitos dos titulares
            </h2>
            <p>
              Você pode sempre solicitar a confirmação de tratamento dos seus dados, a correção ou
              remoção/eliminação de seus dados e informações pessoais, relatar eventual uso indevido
              ou exercer qualquer direito previsto na Lei n. 13.709/2018 (Lei Geral de Proteção de
              Dados) entrando em contato por meio do e-mail{' '}
              <a href="mailto:andre@santiesantiimportadora.com.br" className="santi-legal__link">
                andre@santiesantiimportadora.com.br
              </a>
              . O prazo de resposta é de até 2 (dois) dias úteis.
            </p>
            <p>
              Em caso de obrigações legais, regulatórias, proteção de eventuais ações judiciais
              futuras ou para manutenção e prosseguimento dos serviços ofertados, os seus dados
              pessoais não serão eliminados, e o tratamento será mantido de acordo com essas bases
              legais expostas e para os fins informados nesta Política de Privacidade e demais
              documentos complementares.
            </p>
            <p>
              O usuário concorda que a coleta, armazenamento, uso e compartilhamento de dados
              pessoais foi realizada em perfeita consonância com as bases legais previstas nos
              artigos 7º e 11, da Lei n. 13.709/2018, tendo dado consentimento informado, livre,
              inequívoco e específico dos dados que podem ser objeto de tratamento, e que fora
              observado os princípios da finalidade, adequação, necessidade, livre acesso, qualidade,
              transparência, segurança, prevenção e não-discriminação (art. 6º, Lei n. 13.709/2018).
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-security">
            <h2 id="legal-security" className="santi-legal__h2">
              Segurança da informação
            </h2>
            <p>
              Estamos sempre preocupados com a segurança de nossos clientes e dos usuários de nosso
              site. Nossas informações são armazenadas em servidores de empresas igualmente
              preocupadas com segurança, com redundância e armazenamento em nuvem, e dispõem de alta
              tecnologia e proteção da informação.
            </p>
            <p>
              Apenas pessoas autorizadas possuem acesso aos dados pessoais tratados por nós,
              garantindo sempre a privacidade dos dados dos titulares.
            </p>
            <p>
              Toda tecnologia disponível nunca será suficiente para prevenir 100% de ataques ou
              acessos não autorizados. Na pequena hipótese de ocorrência de um vazamento ou violação à
              privacidade dos dados dos titulares, nós comunicaremos em tempo razoável quais dados
              foram afetados e todas as medidas por nós tomadas para reparar possíveis danos.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-cookies-tech">
            <h2 id="legal-cookies-tech" className="santi-legal__h2">
              Cookies e tecnologias similares
            </h2>
            <p>
              Nosso site utiliza cookies(*) desde os PHP até os fornecidos pelo Google Analytics para
              acompanhar as interações com o visitante, podendo armazenar informações como o horário
              em que a visita atual ocorreu, se o visitante já esteve no site antes ou se houve
              alguma indicação para acesso ao nosso site.
            </p>
            <p>
              *Cookie: arquivo colocado em seu computador para rastrear movimentos dentro do site,
              como visitas as páginas e anúncios. Cookies não armazenam informações pessoais sem que
              você as tenha fornecido e não coletam informações registradas em seu computador.
            </p>
            <p>Os navegadores não compartilham seus cookies entre domínios.</p>
            <p>
              Utilizamos também a ferramenta Google Analytics para avaliar a audiência do nosso site e
              melhorar constantemente a oferta de conteúdo para nossos usuários e clientes. Essa
              ferramenta possui Condições Gerais de Uso e Política de Privacidade próprios,{' '}
              <a
                href="https://policies.google.com/privacy"
                className="santi-legal__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                disponíveis no site do Google
              </a>
              .
            </p>
            <p>
              Além disso, utilizamos por padrão cookies PHP, criados como identificador único de
              sessão do usuário, usados para identificar se um usuário retorna ao nosso site e/ou por
              qual meio ele foi direcionado até o nosso site.
            </p>
            <p>
              Não descartamos ainda a criação de cookies de forma indireta em razão de serviços de
              terceiros disponibilizados através do nosso site, para coleta de forma automática de
              informações gerais de navegação, de forma a melhorar e agregar mais valor a experiência
              do usuário em nosso site.
            </p>
            <p>
              Você poderá optar pelo não fornecimento de cookies a qualquer momento desabilitando
              respectiva função de seu navegador, ciente de que ao fazê-lo, os serviços fornecidos ao
              usuário poderão não apresentar todas as suas funcionalidades.
            </p>
          </section>

          <section className="santi-legal__section" aria-labelledby="legal-update">
            <h2 id="legal-update" className="santi-legal__h2">
              Atualização da política de privacidade
            </h2>
            <p>
              Reservamo-nos o direito de alterar este documento. Recomendamos consultá-lo
              periodicamente; alterações relevantes serão refletidas na data de última modificação
              indicada no início desta página.
            </p>
          </section>
        </article>
      </main>

      <footer className="santi-footer">
        <div className="santi-footer__row">
          <span>
            © {new Date().getFullYear()} Santi &amp; Santi Importadora e Distribuidora
          </span>
          <div className="santi-footer__links">
            <Link to="/privacidade">Privacidade</Link>
          </div>
          <FooterSocial />
        </div>
        <FooterKankaLogo />
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
