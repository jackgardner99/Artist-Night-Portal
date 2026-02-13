export const Login = () => {


    return (
        <main>
            <section>
                <form>
                    <h1>Welcome Manager!</h1>
                    <h2>Manager Sign In</h2>
                    <fieldset>
                        <div>
                            <input 
                            type="email" 
                            value={email} 
                            onChange={(event) => {setEmail(event.target.value)}}
                            placeholder="Email Address"
                            required
                            autoFocus/>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section>
                <div>
                    <button onClick={handleLogin}>Sign In</button>
                </div>
            </section>
        </main>
    )
}