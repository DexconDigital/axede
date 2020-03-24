<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-Auth-Token, Origin, Authorization');
$req_method = $_SERVER['REQUEST_METHOD'];
// $_POST = $_GET;
class nuevoPDO
{
  private $querySql = array();
  private $options = array();
  public $res;
  public $resquery;
  public $content = "";
  private $db;
  private $token;

    public function __construct()
    {
      include "../conexion/connectPDO.php";
      $this->db = $db;
      $this->token = $token;

      $this->createQuery();
      $this->executeQuery();  
    }

    private function createQuery(){
      $arrayOptions = array();
      switch ($_POST['get']) {
          
          case 'estrategiaEmpresa':
            $this->querySql['query'] = 'REPLACE INTO estrategia_empresa (IdProyecto, AnoInicial, AnoFinal, Estrategas) VALUES (:idProyecto, :anoInicial, :anoFinal, :estrategas);'; 
            array_push($arrayOptions,'idProyecto', 'idEmpresa', 'anoInicial', 'anoFinal', 'estrategas');
            break;

          case 'estrategiaMisionVision':
            $this->querySql['query'] = 'REPLACE INTO estrategia_misionvision (IdProyecto, Mision, Vision) VALUES (:idProyecto, :mision, :vision);'; 
            array_push($arrayOptions,'idProyecto', 'idEmpresa', 'mision', 'vision');
            break;

          case 'estrategiaDofaResumen':
            $this->querySql['query'] = 'REPLACE INTO estrategia_dofaresumido (IdProyecto, Resumen) VALUES (:idProyecto, :resumen);'; 
            array_push($arrayOptions,'idProyecto', 'idEmpresa', 'resumen');
            break;

          case 'estrategiaFuerzasPorter':
            $this->querySql['query'] = 'REPLACE INTO estrategia_fuerzasporter (IdProyecto, F1, F2, F3, F4, F5) VALUES (:idProyecto, :F1, :F2, :F3, :F4, :F5);'; 
            array_push($arrayOptions,'idProyecto', 'idEmpresa', 'F1', 'F2', 'F3', 'F4', 'F5');
            break;

          case 'estrategiaMatrizBCG':
            $this->querySql['query'] = 'REPLACE INTO estrategia_matrizbcg (IdProyecto, Estrellas, Interrogantes, Vaca, Perro) VALUES (:idProyecto, :Estrellas, :Interrogantes, :Vaca, :Perro);'; 
            array_push($arrayOptions,'idProyecto', 'idEmpresa', 'Estrellas', 'Interrogantes', 'Vaca', 'Perro');
            break;

          case 'estrategiaKpis':
            $this->querySql['query'] = 'REPLACE INTO estrategia_kpis (IdACtividad, Nombre, Frecuencia, Valor1, Valor2, Formula) VALUES (:idActividad, :nombre, :frecuencia, :valor1, :valor2, :formula);'; 
            array_push($arrayOptions,'idActividad', 'nombre', 'frecuencia', 'valor1', 'valor2', 'formula');
            break;
          
          default:
              $this->querySql['query'] = '';
      }

      $this->createOptions($arrayOptions);
    }

    private function createOptions($arrayOptions){
          foreach ($arrayOptions as $key => $value) {
          $this->options[':'.$value] = $_POST[$value];
        }
    }

    private function pdo_sql_debug($sql,$placeholders){
        foreach($placeholders as $k => $v){
            // echo $k,$v;
            $sql = preg_replace('/'.$k.'/',"'".$v."'",$sql);
        }
        return $sql;
    }

    private function executeQuery(){
      $this->resquery = $this->pdo_sql_debug($this->querySql['query'],$this->options);
      $stmt = $this->db->prepare($this->querySql['query']);
      $this->res = $stmt->execute($this->options);
      if(!$this->res){
        $this->content = $stmt->errorInfo();
      }
      $stmt = NULL;
    }
}

$w = new nuevoPDO();

$respuesta = array(
    'contenido' => $w->content,
    'response' => $w->res,
    'post' => $_POST,
    'method' =>$req_method,
    'query' =>$w->resquery,
  );
// print_r($_POST);
echo json_encode($respuesta);

?>