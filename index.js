var MISSED_EXAM_XTER = "-";
var DOES_NOT_DO_EXAM = "";
var UNSUAL_MARKS = {missed_exam:0, does_not_do_exam:-1};

function analyze_marks()
{
    /* logic:
        1) get all mark entries (they belong to class "marks")
        2) loop through all mark entries and note the ones with issues. set the border color of each entry to normal
        3) if any mark entry was found with issues, hightlight it otherwise, proceed with operation on the marks
    */
    
    var mark_entries = document.getElementsByClassName("marks");
    var mark;

    var marks_with_issues = [];
    var modified_marks = [];
        
    for(var i=0; i<mark_entries.length; ++i)
    {
        mark = mark_entries[i].value;
        if(isNaN(parseInt(mark)))
        {
            /* i begin with is does_not_do_exam coz i assume its the most likely scenario in A-Level. feel free to advise me on this */
            if(mark==DOES_NOT_DO_EXAM){modified_marks.push(UNSUAL_MARKS.does_not_do_exam);}
            else if(mark==MISSED_EXAM_XTER) {modified_marks.push(UNSUAL_MARKS.missed_exam);}
            else {marks_with_issues.push(i);}
        }
        else
        {
            mark=parseInt(mark);
            if(mark<0 || mark>100) {marks_with_issues.push(i);}
            else{modified_marks.push(mark ? mark : ++mark)} /* note that i used ++mark NOT mark++ */
        }
        mark_entries[i].style.borderColor = "";
    }
    
    if(modified_marks.length==mark_entries.length) 
    {/*do whatever you wanna do with the modified_marks*/
        console.log(modified_marks);
    }
    else        
    {
        for(var i=0; i<marks_with_issues.length; ++i)
        {
            mark_entries[marks_with_issues[i]].style.borderColor = "red";
        }
    }
}

window.onload = function(){
    var marks_div = document.getElementById("marks_div");
    var marks_entries = 10;
    var input;
    for(var i=0; i<marks_entries; ++i)        
    {
        input = document.createElement("input");
        input.setAttribute("class","marks");
        input.style.display = "block"; /* let em be on different lines */
        input.style.textAlign = "center"; /* much better when input is centered! */
        marks_div.appendChild(input);
    }

    input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("value","Submit Marks");
    input.style.display = "block";
    input.style.backgroundColor = "green";
    input.style.borderRadius = "7px 7px";

    input.onclick = analyze_marks;
    
    marks_div.appendChild(input);
};