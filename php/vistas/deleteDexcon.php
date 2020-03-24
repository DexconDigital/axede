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

          case 'gtcRiesgosEtapas':
              $this->querySql['query'] = 'DELETE FROM gtc_peligrosporetapa where IdEtapa =:idEtapa and IdPeligro =:idPeligro';
              array_push($arrayOptions,"idEtapa","idPeligro");
              break;

          case 'gtcEtapa':
              $this->querySql['query'] = 'DELETE FROM gtc_procesosporetapa where IdEtapa =:idEtapa;DELETE FROM gtc_etapas where Id =:idEtapa';
              array_push($arrayOptions,"idEtapa");
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