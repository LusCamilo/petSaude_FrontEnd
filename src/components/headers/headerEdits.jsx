import SetaSair from '../../assets/svg/SetaSairEdit.svg'
import SingOut from '../../assets/svg/SingOut.svg'
import * as React from 'react';

export function Header() {
    return (
        <div className="bg-[#9ED1B7] h-60 flex flex-row justify-between pr-20 pl-20 pr-5.5 items-center">
            <a href="" className="basis-1/8 h-20 w-50">
                <img src={SetaSair} className="h-20 w-50" alt="Sair da página"/>
            </a>
            <a href="" className="basis-1/8">
                <img src={SingOut} alt="Sair da página"/>
            </a>
        </div>
    )
}