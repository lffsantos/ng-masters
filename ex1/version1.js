function vaibuscarasissues(){
    

    function GithubRepo(username, reponame){
    	var url = 'https://api.github.com/repos/'+username+'/'+reponame+'/issues'
    	var issues = []
    	
    	var result = {

    		busca_issues : function(load_table){
    			$.get(url).success(function(result){
					issues = result
                    load_table();    
				}).error(function() {
                    alert("Usuário ou Repositório Inválido")
                });
    		},
            empty_list: function(table_id){
                $(table_id).html("Não existem Issues!");    
            },
            clean_table: function(table_id){
                $(table_id).html("");    
            },
    		popula_tabela : function(table_id){
    			var table = '';
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
    	}    	
    	return result;
    }

    var username = $('#user').val();
    var reponame = $('#reponame').val();
    var le_repo = GithubRepo(username, reponame);
    le_repo.clean_table("#issuestable");
    le_repo.busca_issues(function load_table(){
	    le_repo.popula_tabela("#issuestable");
	});
}

