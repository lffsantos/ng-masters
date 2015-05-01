function vaibuscarasissues(){
    

    function GithubRepo(username, reponame){

    	this.url = 'https://api.github.com/repos/'+username+'/'+reponame+'/issues'
    	this.issues = []


    }
    GithubRepo.prototype.busca_issues = function(load_table){
    	// salva valor da variavel this antes de fazer o get do ajax, post la o this vai ser outro
    	var _this = this;
    	$.get(this.url).success(function(result){
					_this.issues = result;
					load_table();
		}).error(function() {
			alert("Usuário ou Repositório Inválido")
		});
                    
        	
    }
    GithubRepo.prototype.popula_tabela = function(table_id){
    	var table = '';
    	issues = this.issues;
		for (var i in issues){
			table += '<tr>';
			table += '<td>'+issues[i].number+'</td>';
			table += '<td>'+issues[i].title+'</td>';
			table += '</tr>';
		}
		
		if(table == ""){
            this.empty_list(table_id);
        } else{
            $(table_id).html(table);       
        }
	}
	GithubRepo.prototype.empty_list = function(table_id){
          $(table_id).html("Não existem Issues!");    
    }
    GithubRepo.prototype.clean_table = function(table_id){
          $(table_id).html("");    
    }
    var username = $('#user').val();
    var reponame = $('#reponame').val();
    var le_repo = new GithubRepo(username, reponame);
    le_repo.busca_issues(function load_table(){
	    le_repo.popula_tabela("#issuestable")
	});

}

